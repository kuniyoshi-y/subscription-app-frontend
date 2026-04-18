"use client";

import { useState } from "react";
import { signIn, signUp, confirmSignUp } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

type Mode = "login" | "signup" | "confirm";

const LoginPage = () => {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn({ username: email, password });
      router.replace("/");
    } catch (err: any) {
      setError(err.message ?? "ログインに失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signUp({ username: email, password });
      setMode("confirm");
    } catch (err: any) {
      setError(err.message ?? "サインアップに失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await confirmSignUp({ username: email, confirmationCode: confirmCode });
      setMode("login");
    } catch (err: any) {
      setError(err.message ?? "確認に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-sm">
        <div className="bg-white border-2 border-slate-900 rounded-2xl shadow-[4px_4px_0px_#94a3b8] p-8">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500 border-2 border-slate-900 text-sm font-black text-white shadow-[2px_2px_0px_#94a3b8]">
              S
            </span>
            <p className="text-base font-black text-slate-900 tracking-tight">
              サブスク管理
            </p>
          </div>

          {mode === "confirm" ? (
            <>
              <h1 className="text-lg font-black text-slate-900 mb-1">
                確認コードを入力
              </h1>
              <p className="text-sm text-slate-500 mb-6">
                {email} に送信されたコードを入力してください
              </p>
              <form onSubmit={handleConfirm} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    確認コード
                  </label>
                  <input
                    type="text"
                    value={confirmCode}
                    onChange={(e) => setConfirmCode(e.target.value)}
                    placeholder="123456"
                    required
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
                {error && (
                  <p className="text-xs text-red-500 font-medium">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-violet-500 text-white text-sm font-black rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_#94a3b8] hover:translate-y-px hover:shadow-none transition-all disabled:opacity-50"
                >
                  {loading ? "確認中..." : "確認する"}
                </button>
              </form>
            </>
          ) : mode === "signup" ? (
            <>
              <h1 className="text-lg font-black text-slate-900 mb-6">
                アカウント作成
              </h1>
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    メールアドレス
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    パスワード
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={8}
                      className="w-full px-3 py-2 pr-10 border-2 border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-violet-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">
                    8文字以上・大文字・小文字・数字・記号（!@#$など）を含めてください
                  </p>
                </div>
                {error && (
                  <p className="text-xs text-red-500 font-medium">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-violet-500 text-white text-sm font-black rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_#94a3b8] hover:translate-y-px hover:shadow-none transition-all disabled:opacity-50"
                >
                  {loading ? "作成中..." : "アカウント作成"}
                </button>
                <button
                  type="button"
                  onClick={() => { setMode("login"); setError(""); }}
                  className="w-full py-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
                >
                  ログインに戻る
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-lg font-black text-slate-900 mb-6">
                ログイン
              </h1>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    メールアドレス
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    パスワード
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full px-3 py-2 pr-10 border-2 border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-violet-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                {error && (
                  <p className="text-xs text-red-500 font-medium">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-violet-500 text-white text-sm font-black rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_#94a3b8] hover:translate-y-px hover:shadow-none transition-all disabled:opacity-50"
                >
                  {loading ? "ログイン中..." : "ログイン"}
                </button>
                <button
                  type="button"
                  onClick={() => { setMode("signup"); setError(""); }}
                  className="w-full py-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
                >
                  アカウントを作成する
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
