import { Inter } from "next/font/google";
import "./globals.css";
import StoreWrapper from "@/common/wrapper/storeWrapper";
import "@mantine/core/styles.css";
import { ColorSchemeScript, createTheme, MantineProvider } from "@mantine/core";
import QueryClientWrapper from "@/common/wrapper/queryClientWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import UserAuthWrapper from "@/common/wrapper/userAuthWrapper";
import SessionProvider from "@/common/wrapper/sessionProvider";
import {registerLicense} from '@syncfusion/ej2-base';


registerLicense('ORg4AjUWIQA/Gnt2XVhhQlJHfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX9RdURjWXxcdHddT2Jc');

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  const theme = createTheme({white:"#242220"});
  return (
    <html lang="en">
      <head>
      </head>
      <body className={inter.className}>
      <SessionProvider session={session}>
        <StoreWrapper>
          <UserAuthWrapper/>
          <QueryClientWrapper>
            <MantineProvider theme={theme}>
              {children}
            </MantineProvider>
          </QueryClientWrapper>
        </StoreWrapper>
      </SessionProvider>
      </body>
    </html>
  );
}
