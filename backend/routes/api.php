<?php

use App\Http\Controllers\ApiExamples\UserController as ApiExamplesUserController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DiaryController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\LogEntryController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ServiceRequestController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VideoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get("user", [UserController::class, "index"]);
Route::post("user", [UserController::class, "store"]);
Route::post("login", [AuthController::class, "login"]);
Route::get("user-clean", [UserController::class, "clean"]);

Route::middleware('auth:sanctum')->get("me", [AuthController::class, "me"]);
Route::middleware('auth:sanctum')->get("logout", [AuthController::class, "logout"]);

Route::apiResource("service-request", ServiceRequestController::class);
Route::get("service-request-clean", [UserController::class, "clean"]);


Route::get("client", [UserController::class, "Clients"]);
Route::get("partner", [UserController::class, "Partners"]);

