export const SYSTEM_MESSAGES: any = {
	SUCCESS: "成功しました",
	FAILURE: "エラーが発生しました",
	FATAL_ERROR:
		"予期せぬエラーが発生しました。しばらくしてから再度お試しください",
	REQUIRE_LOGIN: "ログインが必要です",
	REQUIRE_LOGOUT: "ログアウトが必要です",
	ILEGAL_URL: "URLが不正です",
	THUMBNAIL_UPLOAD_REQUIRED: "まずは投稿画像をアップロードしてください。",
};


/**
 * Here are the HTTP response codes that will trigger an alert.
 * 
 * 422: Unprocessable Entity
 * 429: Too Many Requests
 */
export const ALERT_ERROR_RESPONSE_CODE = [422, 429]