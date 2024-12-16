<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Contact;
class ContactController extends Controller
{
    // GET: Get all Contacts
    public function index()
    {
        $contacts = Contact::where('status', '!=', 0)->get();
        return response()->json([
            'status' => true,
            'contacts' => $contacts
        ]);
    }

    // POST: Create a new Contact
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'phone' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'replay_id' => 'nullable|integer',
            'created_by' => 'nullable|integer',
            'updated_by' => 'nullable|integer',
            'status' => 'required|integer|in:0,1',
        ]);

        $contact = Contact::create($validatedData);
        return response()->json([
            'status' => true,
            'message' => 'Contact created successfully',
            'contact' => $contact
        ]);
    }

    // GET: Get a specific Contact by ID
public function show($id)
{
    // Find the contact by ID or fail if it doesn't exist
    $contact = Contact::find($id);

    // Check if the contact exists
    if ($contact) {
        return response()->json([
            'status' => true,
            'contact' => $contact,
            'message' => 'Contact details fetched successfully.',
        ]);
    } else {
        return response()->json([
            'status' => false,
            'message' => 'Contact not found.'
        ]);
    }
}


    // POST: Update a Contact by ID
    public function update(Request $request, $id)
    {
        // Find the contact by ID or fail if it doesn't exist
        $contact = Contact::findOrFail($id);

        // Validate the input data
        $validatedData = $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|string|email|max:255',
            'phone' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'replay_id' => 'nullable|integer',
            'status' => 'nullable|integer|in:0,1', // 0 for inactive, 1 for active
        ]);

        // Update only the fields that have been provided in the request
        // Filter out null values from validated data before updating
        $contact->update(array_filter($validatedData));

        // Respond with a success message and the updated contact
        return response()->json([
            'status' => true,
            'message' => 'Contact updated successfully',
            'contact' => $contact
        ]);
    }


    // GET: Change the status of a Contact
    public function changeStatus($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->status = $contact->status == 1 ? 0 : 1;
        $contact->save();

        return response()->json([
            'status' => true,
            'message' => 'Contact status updated',
            'contact' => $contact
        ]);
    }

    // GET: Soft delete a Contact (move to trash)
    public function delete($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->status = 0; // Assuming status '0' means deleted
        $contact->save();

        return response()->json([
            'status' => true,
            'message' => 'Contact moved to trash'
        ]);
    }

    // GET: Restore a deleted Contact
    public function restore($id)
    {
        $contact = Contact::withTrashed()->findOrFail($id);
        $contact->restore();

        return response()->json([
            'status' => true,
            'message' => 'Contact restored successfully'
        ]);
    }

    // DELETE: Permanently delete a Contact
    public function destroy($id)
    {
        $contact = Contact::find($id);

        if ($contact == null) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'contact' => null
            ]);
        }

        if ($contact->delete()) {
            return response()->json([
                'status' => true,
                'message' => 'Xóa thành công',
                'contact' => $contact
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thể xóa',
                'contact' => null
            ]);
        }
    }

    // GET: Get all Contacts in the trash
    public function trash()
    {
        $contacts = Contact::onlyTrashed()->get();
        return response()->json([
            'status' => true,
            'contacts' => $contacts
        ]);
    }
}