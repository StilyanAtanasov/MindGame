<?php

use App\Http\Controllers\FactController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $facts = \App\Models\Fact::paginate(2);
    $categories = \App\Models\Category::all();
    $category_filter = 0;

    return view('welcome', compact('facts', 'categories', 'category_filter'));
});

Route::match(['get', 'post'], 'facts/search', [FactController::class, 'search'])->name('facts.search');
