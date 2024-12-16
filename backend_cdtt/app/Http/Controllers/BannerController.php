<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Banner;
use App\Http\Requests\StoreBannerRequest;
use App\Http\Requests\UpdateBannerRequest;

class BannerController extends Controller
{
    // GET: Get all active banners
    public function index()
    {
        $banners = Banner::where('status', '!=', 0)
            ->orderBy('sort_order', 'ASC')
            ->get();

        $banners->each(function ($banner) {
            $banner->image_url = url('images/banner/' . $banner->image);
        });

        return response()->json([
            'status' => true,
            'banners' => $banners
        ]);
    }

    // POST: Create a new banner
    public function store(StoreBannerRequest $request)
    {
        $banner = new Banner();
        $this->saveBannerData($banner, $request);

        if ($banner->save()) {
            return response()->json([
                'status' => true,
                'message' => 'Banner created successfully',
                'banner' => $banner
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'Unable to create banner'
        ]);
    }

    // GET: Get a specific banner by ID
    public function show($id)
    {
        $banner = Banner::find($id);

        if ($banner) {
            $banner->image_url = url('images/banner/' . $banner->image);
            return response()->json([
                'status' => true,
                'banner' => $banner
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'Banner not found'
        ]);
    }

    // PUT: Update a banner by ID
 public function update(Request $request, $id)
{
    $banner = Banner::findOrFail($id);

    // Validate request data
    $validatedData = $request->validate([
        'name' => 'string|max:255',
        'link' => 'nullable|url|max:255',
        'description' => 'nullable|string',
        'position' => 'nullable|string|max:255',
        'sort_order' => 'nullable|integer|min:0',
        'status' => 'integer|in:0,1',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // max size 2MB, adjust as needed
    ]);

    // Handle image upload if a new image is provided
    if ($request->hasFile('image')) {
        // Delete old image if needed
        if ($banner->image) {
            Storage::delete($banner->image);
        }

        // Store new image and update path
        $validatedData['image'] = $request->file('image')->store('banners');
    }

    // Update banner with validated data
    $banner->update($validatedData);

    return response()->json([
        'status' => true,
        'message' => 'Banner updated successfully',
        'banner' => $banner
    ]);
}


    // PATCH: Toggle banner status (1 <=> 2)
    public function changeStatus($id)
    {
        $banner = Banner::find($id);

        if (!$banner) {
            return response()->json([
                'status' => false,
                'message' => 'Banner not found'
            ]);
        }

        $banner->status = $banner->status == 1 ? 2 : 1;
        $banner->save();

        return response()->json([
            'status' => true,
            'message' => 'Banner status updated',
            'banner' => $banner
        ]);
    }

    // DELETE: Soft delete a banner (move to trash)
    public function delete($id)
    {
        $banner = Banner::find($id);

        if (!$banner) {
            return response()->json([
                'status' => false,
                'message' => 'Banner not found'
            ]);
        }

        $banner->status = 0;
        $banner->save();

        return response()->json([
            'status' => true,
            'message' => 'Banner moved to trash'
        ]);
    }

    // PATCH: Restore a soft-deleted banner
    public function restore($id)
    {
        $banner = Banner::where('status', 0)->find($id);

        if (!$banner) {
            return response()->json([
                'status' => false,
                'message' => 'Banner not found in trash'
            ]);
        }

        $banner->status = 2;
        $banner->save();

        return response()->json([
            'status' => true,
            'message' => 'Banner restored successfully'
        ]);
    }

    // DELETE: Permanently delete a banner
    public function destroy($id)
    {
        $banner = Banner::find($id);

        if (!$banner) {
            return response()->json([
                'status' => false,
                'message' => 'Banner not found'
            ]);
        }

        if ($banner->delete()) {
            return response()->json([
                'status' => true,
                'message' => 'Banner permanently deleted'
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'Unable to delete banner'
        ]);
    }

    // GET: Get all banners in the trash
    public function trash()
    {
        $banners = Banner::where('status', 0)
            ->orderBy('sort_order', 'ASC')
            ->get();

        $banners->each(function ($banner) {
            $banner->image_url = url('images/banner/' . $banner->image);
        });

        return response()->json([
            'status' => true,
            'banners' => $banners
        ]);
    }

    // Helper: Save banner data for create and update methods
    private function saveBannerData(Banner $banner, Request $request)
    {
        $banner->name = $request->name;
        $banner->link = $request->link;
        $banner->description = $request->description;
        $banner->position = $request->position;
        $banner->sort_order = $request->sort_order;
        $banner->status = $request->status;

        if ($request->hasFile('image')) {
            $imageName = date('YmdHis') . "." . $request->image->extension();
            $request->image->move(public_path('images/banner'), $imageName);
            $banner->image = $imageName;
        }

        if ($request->isMethod('post')) {
            $banner->created_by = 1;
        } else {
            $banner->updated_by = 1;
        }
    }
}