import { Box } from "lucide-react";
import React from "react";
import Button from "./ui/Button";
import { useOutletContext } from "react-router";

export default function Navbar() {
  const { isSignedIn, username, userId, signIn, signOut } =
    useOutletContext<AuthContext>();

  const handleAuthClick = async () => {
    if (isSignedIn) {
      try {
        await signOut();
      } catch (e) {
        console.log(`Puter signout failed: ${e}`);
      }

      return;
    }

    try {
      await signIn();
    } catch (e) {
      console.log(`Puter Signin failed: ${e}`);
    }
  };

  return (
    <header className="navbar">
      <div className="inner">
        <div className="left">
          <div className="brand">
            <Box className="logo" />
            <span className="name">Roomify </span>
          </div>
          <ul className="links">
            <a href="#">Product</a>
            <a href="#">Pricing</a>
            <a href="#">Community</a>
            <a href="#">Enterprise</a>
          </ul>
        </div>
        <div className="actions">
          {isSignedIn ? (
            <>
              <span className="greeting">
                {username ? `Hi, ${username}` : `sign in`}
              </span>
              <Button size="sm" onClick={handleAuthClick} className="btn">
                LOG OUT
              </Button>
            </>
          ) : (
            <>
              <Button
                size="sm"
                variant="ghost"
                className="login"
                onClick={handleAuthClick}
              >
                LOG IN
              </Button>
              <a href="#upload" className="cta">
                Get Started
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
