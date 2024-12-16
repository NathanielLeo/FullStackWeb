<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Post; // Đổi từ Menu sang Post

class PostController extends Controller
{
    // GET: Get all Posts
    public function index()
    {
        $posts = Post::where('status', '!=', 0)
            ->get(['id', 'title', 'topic_id', 'content', 'description', 'thumbnail', 'type', 'created_by', 'updated_by', 'created_at', 'updated_at', 'status']);

        return response()->json([
            'status' => true,
            'posts' => $posts
        ]);
        foreach ($posts as $post) {
            $post->image_url = url('images/post/' . $post->image);
        }
    }

    // POST: Create a new Post
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'topic_id' => 'required|integer',
            'content' => 'required|string',
            'description' => 'nullable|string|max:500',
            'thumbnail' => 'nullable|string|max:255',
            'type' => 'required|string|max:255',
            'created_by' => 'nullable|integer',
            'updated_by' => 'nullable|integer',
            'status' => 'required|integer|in:0,1',
        ]);

        $post = Post::create($validatedData);
        return response()->json([
            'status' => true,
            'message' => 'Post created successfully',
            'post' => $post
        ]);
    }

    // GET: Get a specific Post by ID
    public function show($id)
    {
        $post = Post::findOrFail($id, ['id', 'title', 'topic_id', 'content', 'description', 'thumbnail', 'type', 'created_by', 'updated_by', 'created_at', 'updated_at', 'status']);

        return response()->json([
            'status' => true,
            'post' => $post
        ]);
    }

    // POST: Update a Post by ID
    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);
        $validatedData = $request->validate([
            'title' => 'nullable|string|max:255',
            'topic_id' => 'nullable|integer',
            'content' => 'nullable|string',
            'description' => 'nullable|string|max:500',
            'thumbnail' => 'nullable|string|max:255',
            'type' => 'nullable|string|max:255',
            'created_by' => 'nullable|integer',
            'updated_by' => 'nullable|integer',
            'status' => 'nullable|integer|in:0,1',
        ]);

        $post->update($validatedData);
        return response()->json([
            'status' => true,
            'message' => 'Post updated successfully',
            'post' => $post
        ]);
    }

    // GET: Change the status of a Post
    public function changeStatus($id)
    {
        $post = Post::findOrFail($id);
        $post->status = $post->status == 1 ? 0 : 1;
        $post->save();

        return response()->json([
            'status' => true,
            'message' => 'Post status updated',
            'post' => $post
        ]);
    }

    // GET: Soft delete a Post (move to trash)
    public function delete($id)
    {
        $post = Post::findOrFail($id);
        $post->status = 0; // Assuming status '0' means deleted
        $post->save();

        return response()->json([
            'status' => true,
            'message' => 'Post moved to trash'
        ]);
    }

    // GET: Restore a deleted Post
    public function restore($id)
    {
        $post = Post::withTrashed()->findOrFail($id);
        $post->restore();

        return response()->json([
            'status' => true,
            'message' => 'Post restored successfully'
        ]);
    }

    // DELETE: Permanently delete a Post
    public function destroy($id)
    {
        $post = Post::find($id);

        if ($post == null) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'post' => null
            ]);
        }

        if ($post->delete()) {
            return response()->json([
                'status' => true,
                'message' => 'Xóa thành công',
                'post' => $post
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thể xóa',
                'post' => null
            ]);
        }
    }

    // GET: Get all Posts in the trash
    public function trash()
    {
        $posts = Post::onlyTrashed()->get();
        return response()->json([
            'status' => true,
            'posts' => $posts
        ]);
    }
}