import { auth, createUserWithEmailAndPassword } from '../firebaseConfig.js';
import { AuthValidation } from './validation/authValidation.js';
import { AuthErrorHandler } from './errorHandler/authErrorHandler.js';

document.addEventListener('DOMContentLoaded', signup);

function signup() {
	const signupFormElement = getSignupFormElement();
	const errorMessageElement = getSignupErrorMessageElement();
	const errorHandler = new AuthErrorHandler();

	signupFormElement.addEventListener('submit', async (event) => {
		const username = getUsernameInput();
		const password = getPasswordInput();

		const validator = new AuthValidation(username, password, errorMessageElement);
		if (!validator.validateSignupFields()) { return; }

		try {
			// ユーザ作成時にFirebase Authへ登録
			const userCredential = await createUserWithEmailAndPassword(auth, username, password);
			// 送信成功時のリダイレクト先
			window.location.href = "signup-success.html";
		} catch (error) {
			errorHandler.handleAuthenticationError(error);
		}
	});

	function getSignupFormElement() {
		return document.getElementById('signupForm');
	}

	function getSignupErrorMessageElement() {
		return document.getElementById('errorMessage');
	}

	function getUsernameInput() {
		return document.getElementById('username').value;
	}

	function getPasswordInput() {
		return document.getElementById('password').value;
	}
}