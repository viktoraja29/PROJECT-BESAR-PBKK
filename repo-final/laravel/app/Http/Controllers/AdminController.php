<?php

namespace App\Http\Controllers;

class AdminController extends Controller
{
    public function dashboard()
    {
        return view('admin.dashboard');
    }

    public function pengaturan()
    {
        return view('admin.pengaturan');
    }
}
