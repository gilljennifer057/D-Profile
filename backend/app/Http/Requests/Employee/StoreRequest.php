<?php

namespace App\Http\Requests\Employee;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:employees,email,' . ($this->employee ? $this->employee->id : null),
            'password' => 'nullable',
            'phone' => 'required|string',
            'address' => 'required|string',
            'date_of_birth' => 'required|date',
            'position' => 'required|string',
            'salary' => 'required|numeric',
            'hire_date' => 'required|date',
            'profile_picture' => 'nullable',
            'legal_id' => 'required|string',
            'local_legal_id' => 'required|string',
            'status' => 'nullable|boolean',
            'department_id' => 'nullable',
        ];
    }
}
