<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V" crossorigin="anonymous"></script>
</head>
<body>
<div class="container">

    <div class="row justify-content-center">
        <div class="col-md-10">
            <h2 style="text-align: center;">
                <span class="badge bg-light text-dark">Fact List</span>
                <br><br>
            </h2>
            <form action="{{ route('facts.search')}}" id="searchForm" method="post">
                @csrf
                <div class="form-group">
                    <select name="category_filter" id="category_filter" class="form-select mb-5" onchange="document.getElementById('searchForm').submit()">
                        echo old('category_filter');
                        <option value="0">All</option>
                        @foreach ($categories as $category)
                            <option value="{{ $category->id }}" @if( $category_filter  == $category->id) selected="selected" @endif>{{ $category->name }}</option>
                        @endforeach
                    </select>
                </div>
            </form>
        </div>
        <div class="col-md-10">
            <table class="table table-hover table-striped">
                <thead class="table-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Text</th>
                    <th scope="col">Category</th>
                </tr>
                </thead>
                <tbody>
                @foreach($facts as $fact)
                    <tr>
                        <th scope="row">{{$fact->id}}</th>
                        <td>{{ $fact->text }}</td>
                        <td> <strong>
                                {{ $fact->category->name }}
                            </strong>
                        </td>

                    </tr>
                @endforeach
                </tbody>
            </table>
            {{ $facts->appends(Request::except('page', '_token'))->links([]) }}
        </div>
    </div>
</div>
</body>
</html>
