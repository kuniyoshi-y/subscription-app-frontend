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
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={8}
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
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
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
