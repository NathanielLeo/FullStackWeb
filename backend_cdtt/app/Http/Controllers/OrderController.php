<?php
namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // GET: Get all Orders
    public function index()
    {
        $orders = Order::where('status', '!=', 0)->get();
        return response()->json([
            'status' => true,
            'orders' => $orders
        ]);
    }

    // POST: Create a new Order
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|integer',
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'updated_by' => 'nullable|integer',
            'status' => 'required|integer|in:0,1',
        ]);

        $order = Order::create($validatedData);
        return response()->json([
            'status' => true,
            'message' => 'Order created successfully',
            'order' => $order
        ]);
    }

    // GET: Get a specific Order by ID
// OrderController.php (Controller)
// OrderController.php
public function show($id)
{
    try {
        // Try to load the order with associated products
        $order = Order::with('products')->findOrFail($id);

        return response()->json([
            'status' => true,
            'order' => $order,
        ]);
    } catch (\Exception $e) {
        // Log the exact error for debugging
        \Log::error('Order show error: ' . $e->getMessage());

        return response()->json([
            'status' => false,
            'message' => 'Error fetching order details: ' . $e->getMessage(),
        ], 500);
    }
}


    // GET: Change the status of an Order
    public function changeStatus($id)
    {
        $order = Order::findOrFail($id);
        $order->status = $order->status == 1 ? 0 : 1;
        $order->save();

        return response()->json([
            'status' => true,
            'message' => 'Order status updated',
            'order' => $order
        ]);
    }

    // GET: Soft delete an Order (move to trash)
    public function delete($id)
    {
        $order = Order::findOrFail($id);
        $order->status = 0; // Assuming status '0' means deleted
        $order->save();

        return response()->json([
            'status' => true,
            'message' => 'Order moved to trash'
        ]);
    }

    // GET: Restore a deleted Order
    public function restore($id)
    {
        $order = Order::withTrashed()->findOrFail($id);
        $order->restore();

        return response()->json([
            'status' => true,
            'message' => 'Order restored successfully'
        ]);
    }

    // DELETE: Permanently delete an Order
    public function destroy($id)
    {
        $order = Order::find($id);

        if ($order == null) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'order' => null
            ]);
        }

        if ($order->delete()) {
            return response()->json([
                'status' => true,
                'message' => 'Xóa thành công',
                'order' => $order
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thể xóa',
                'order' => null
            ]);
        }
    }

    // GET: Get all Orders in the trash
    public function trash()
    {
        $orders = Order::onlyTrashed()->get();
        return response()->json([
            'status' => true,
            'orders' => $orders
        ]);
    }
}