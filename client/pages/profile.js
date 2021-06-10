import MainLayout from "../containers/main_layout";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import { buttonTheme } from "../themes/theme";
import { IKContext, IKUpload } from "imagekitio-react";
import { origin } from "../config/config";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import utilStyles from "../styles/utils.module.css";
import MuiAlert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, updateAvatarURL } from "../features/userSlice";
import UsersUtil from "../utils/UsersUtil";
import { useState } from "react";
import Image from "next/image";
import imageLoader from "../helpers/imageLoader";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: "2rem 0 2rem 0",
  },
}));

export default function Profile() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { username, avatarURL } = useSelector(selectUserInfo);

  const [open, setOpen] = useState(false);
  const openSnackbar = () => {
    setOpen(true);
  };
  const closeSnackbar = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onError = (err) => {
    console.error("Error updating user avatar");
  };

  const [snackbarText, setSnackbarText] = useState("");
  const onSuccess = async (res) => {
    if (res.fileType === "image") {
      const avatarPath = res.filePath;
      if (await UsersUtil.updateUserAvatar(avatarPath)) {
        dispatch(updateAvatarURL(avatarPath));
        setSnackbarText("Avatar is successfully updated!");
        openSnackbar();
      }
    }
  };

  return (
    <MainLayout componentName="Profile">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        key={"top" + "center"}
        open={open}
        onClose={closeSnackbar}
        autoHideDuration={3000}
      >
        <Alert severity="success">{snackbarText}</Alert>
      </Snackbar>

      <div className={utilStyles.uploadedAvatar}>
        <Image
          loader={imageLoader}
          src={
            avatarURL
              ? `${process.env.NEXT_PUBLIC_IMGKIT_IMGKIT_URL_ENDPOINT}/tr:r-max/${avatarURL}?tr=w-300,h-300`
              : `${process.env.NEXT_PUBLIC_IMGKIT_IMGKIT_URL_ENDPOINT}/default-avatar_TAffG0nED.png?tr=w-300,h-300`
          }
          priority
          height={200}
          width={200}
          alt={username}
        />
      </div>

      <IKContext
        publicKey={process.env.NEXT_PUBLIC_IMGKIT_PUBLIC_KEY}
        urlEndpoint={process.env.NEXT_PUBLIC_IMGKIT_IMGKIT_URL_ENDPOINT}
        authenticationEndpoint={`${origin}/api/user/profile/updateAvatar/auth`}
      >
        <MuiThemeProvider theme={buttonTheme}>
          <Button color="primary">
            Change avatar
            <IKUpload
              fileName="user_avatar.png"
              onError={onError}
              onSuccess={onSuccess}
              folder={"/chekchat_upload"}
              style={{ position: "absolute" }}
            />
          </Button>
        </MuiThemeProvider>
      </IKContext>
      <br />

      <TextField
        required
        id="username"
        name="username"
        label="Username"
        autoComplete="off"
        variant="filled"
        className={classes.textField}
        value={username}
        // onChange={}
      />
      <br />

      <MuiThemeProvider theme={buttonTheme}>
        <Button
          variant="contained"
          color="primary"
          className={utilStyles.button}
          type="submit"
          // onClick={handleClick}
        >
          Update
        </Button>
      </MuiThemeProvider>
    </MainLayout>
  );
}
