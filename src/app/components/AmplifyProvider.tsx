"use client";

import { Amplify } from "aws-amplify";
import { amplifyConfig } from "@/src/lib/auth/amplify-config";

Amplify.configure(amplifyConfig, { ssr: true });

const AmplifyProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default AmplifyProvider;
