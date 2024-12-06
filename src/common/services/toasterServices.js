import { Badge } from '@mantine/core';
import { notifications } from '@mantine/notifications';
// import CancelRed from "../../public/assets/icons/cancel-red.svg";
// import SuccessCheck from "../../public/assets/icons/success-green.svg";

const SuccessToast = ({ text = '' }) => {
  notifications.show({
    title: 'Success',
    message: text,
    icon: <Badge size='md' circle color='green' />,
    classNames: {
      icon: '!bg-white',
      root: '!min-w-52',
    },
  });
};
const ErrorToast = ({ text = 'Something went wrong' }) => {
  notifications.show({
    title: 'Error',
    message: text,
    icon: <Badge size='md' circle color='red' />,
    classNames: {
      icon: '!bg-white',
      root: '!min-w-52',
    },
  });
};

const WarningToast = ({ text = 'Something went wrong' }) => {
  notifications.show({
    title: 'Warning',
    message: text,
    icon: <Badge size='md' circle color='yellow' />,
    classNames: {
      icon: '!bg-white ',
      root: '!min-w-52',
    },
  });
};

const NotificationToast = ({ text = 'Something went wrong' }) => {
  notifications.show({
    title: 'Notification',
    message: text,
    icon: <Badge size='md' circle color='blue' />,
    classNames: {
      icon: '!bg-white ',
      root: '!min-w-52',
    },
  });
};

export { SuccessToast, ErrorToast, WarningToast, NotificationToast };
