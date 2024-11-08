<?php

use App\Http\Controllers\Page\PageController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GitHubController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/todolist', [PageController::class, 'todolist'])->name('todolist');

Route::get('/github/repos/{username}', [GitHubController::class, 'getUserRepos']);
