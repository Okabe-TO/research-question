// 元々は、HTMLにscriptタグで埋め込まれていた
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js';

const auth = firebaseSetup();
function firebaseSetup() {
	const firebaseConfig = {
		apiKey: "AIzaSyAt1O_d0v7s8i7mcXcK2F0a2N8hqsOx684",
		authDomain: "foreignar.firebaseapp.com",
		projectId: "foreignar",
		storageBucket: "foreignar.appspot.com",
		messagingSenderId: "133387199847",
		appId: "1:133387199847:web:2a19f1247b3308be767bc2",
		measurementId: "G-GZJ2PP03NB"
	};

	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);
	return auth;
}

document.addEventListener('DOMContentLoaded', signup);
function signup() {
	const signupForm = document.getElementById('signupForm');
	const errorMessage = document.getElementById('errorMessage');

	signupForm.addEventListener('submit', async (event) => {
		var username = document.getElementById('username').value;
		var password = document.getElementById('password').value;

		submitValidation(username, password);
		function submitValidation(username, password) {
			if (!username.includes('@')) {
				errorMessage.textContent = '有効なE-mailアドレスを入力してください。';
				return;
			}
			if (password.length < 6) {
				errorMessage.textContent = 'パスワードは6文字以上で入力してください。';
				return;
			}
		}

		try {
			// ユーザ作成時にFirebase Authへ登録
			const userCredential = await createUserWithEmailAndPassword(auth, username, password);
			// 送信成功時のリダイレクト先
			window.location.href = "signup_success.html";
		} catch (error) {
			errorHandling(error);
			function errorHandling(error) {
				console.error("エラー:", error);
				switch (error.code) {
					case 'auth/email-already-in-use':
						errorMessage.textContent = 'このE-mailアドレスはすでに使用されています。';
						break;
					case 'auth/invalid-email':
						errorMessage.textContent = '無効なE-mailアドレスが入力されました。';
						break;
					case 'auth/operation-not-allowed':
						errorMessage.textContent = 'この認証方法は現在利用できません。';
						break;
					case 'auth/weak-password':
						errorMessage.textContent = 'パスワードが弱すぎます。もう一度確認してください。';
						break;
					case 'auth/user-disabled':
						errorMessage.textContent = 'このアカウントは無効化されています。';
						break;
					case 'auth/user-not-found':
						errorMessage.textContent = 'アカウントが存在しません。';
						break;
					case 'auth/wrong-password':
						errorMessage.textContent = 'パスワードが間違っています。';
						break;
					default:
						errorMessage.textContent = error.message; // その他のエラーメッセージを表示
						break;
				}
			}
		}
	});
}
