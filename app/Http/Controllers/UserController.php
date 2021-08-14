<?php

namespace App\Http\Controllers;

use JWTAuth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\JWTException;

class UserController extends Controller
{
    protected function validation_rules()
    {
        return [
            'fullname' => 'required|string|max:50',
            'username' => 'required|string|max:50|unique:users',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6|max:50',
            'cnf_password' => 'required|min:6|max:50|same:password'
        ];
    }


    //store user
    function store(Request $req)
    {
        //validation
        $validator = Validator::make($req->all(), $this->validation_rules());
        if($validator->fails())
        {
            return response()->json(["errors" => $validator->errors()], 200);
        }

        $user = new User;
        $user->name = $req->input('fullname');
        $user->username = $req->input('username');
        $user->email = $req->input('email');
        $user->password = Hash::make($req->input('password'));

        $user->save();

        return response()->json([
            "message" => "User registered successfully! A confirmation email has been sent to your email. Please verify it.",
            "user" => $user
        ], 200);
    }

    function auth(Request $request)
    {
        $credentials = $request->only('email', 'password');

        //valid credential
        $validator = Validator::make($credentials, [
            'email' => 'required|email|string',
            'password' => 'required|string|min:6|max:50'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 200);
        }

        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json([
                	'success' => false,
                	'message' => 'Login credentials are invalid.',
                ], 200);
            }
        } catch (JWTException $e) {
    	    return $credentials;
            return response()->json([
                	'success' => false,
                	'message' => 'Could not create token.',
                ], 500);
        }

 		//Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'token' => $token,
        ]);
    }


    //logout
    public function logout(Request $request)
    {
        //valid credential
        $validator = Validator::make($request->only('token'), [
            'token' => 'required'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 200);
        }

		//Request is validated, do logout
        try {
            JWTAuth::invalidate($request->token);

            return response()->json([
                'success' => true,
                'message' => 'User has been logged out'
            ]);
        } catch (JWTException $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, user cannot be logged out'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
