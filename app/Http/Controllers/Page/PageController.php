<?php

// app/Http/Controllers/PageController.php
namespace App\Http\Controllers\Page;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class PageController extends Controller
{
    public function todolist()
    {
        return view('layouts.todolist');
    }
}
