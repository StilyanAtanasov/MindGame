<?php

namespace App\Http\Controllers;

use App\Models\Fact;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FactController extends Controller
{
    public function search(Request $request)
    {
        $category_filter = is_null($request['category_filter']) ? 0 : $request['category_filter'];


        if ($category_filter){
            $facts = Fact::where('category_id', $category_filter)->paginate(2);;
        }
        else {
            $facts = Fact::paginate(2);
        }
        $categories = Category::all();

        return view('welcome', compact('facts', 'categories', 'category_filter'));
    }

    public function getRandomFact($category)
    {
        $facts = Fact::select(
            "facts.text"
        )
            ->join("categories", "categories.id", "=", "facts.category_id")
            ->where("categories.name", "=", "$category")
            ->get();

        $randomID = rand(0, count($facts) - 1);
        return response()->json(count($facts)?$facts[$randomID]:['text' => ''], 200, ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'], JSON_UNESCAPED_UNICODE);
    }

}
