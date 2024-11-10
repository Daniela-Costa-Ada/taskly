<?php

// app/Http/Controllers/PageController.php

namespace App\Http\Controllers\Page;

use App\Http\Controllers\Controller;

class PageController extends Controller
{
    public function todolist()
    {
        return view('layouts.todolist');
    }
}
