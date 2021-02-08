@extends('layouts.default')

@section('content')

<div class="edit">
<h2>Ajouter un users</h2>

    <form action="/users" method="post">
        @csrf
        <label for="nom">Nom</label>
        <input type="text" name="nom" id="nom" required>
        <label for="prenom">Prenom</label>
        <input type="text" name="prenom" id="prenom" required>
        <label for="sexe">Sexe</label>
        <select name="sexe" id="sexe" required>
            <option value="">--sexe--</option>
            <option value="masculin">masculin</option>
            <option value="feminin">feminin</option>
        </select>
        <label for="admin">Admin</label>
        <select name="admin" id="admin" required>
            <option value="">--admin--</option>
            <option value="1">admin</option>
            <option value="0">not admin</option>
        </select>
        <label for="email">Email</label>
        <input type="email" name="email" id="email" required>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" required>
        <input type="submit">
    </form>

</div>


@endsection