<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class StoreCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:category,slug',
            'image' => 'required|image|mimes:jpeg,png',
            'parent_id' => 'nullable|integer|exists:category,id',
            'sort_order' => 'nullable|integer',
            'description' => 'nullable|string|max:1000',
            'status' => 'required|integer',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Tên không được để trống',
            'slug.required' => 'Slug không được để trống',
            'slug.unique' => 'Slug đã tồn tại, vui lòng chọn slug khác',
            'image.required' => 'image không được để trống',
            'image.image' => 'image phải là hình ảnh hợp lệ',
            'status.required' => 'Trạng thái là bắt buộc',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'status' => false,
            'message' => 'Validation errors',
            'errors' => $validator->errors()
        ]));
    }
}