import { Button, Group, Menu, Modal, MultiSelect, Select, TextInput, Switch } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import Scrollbars from 'react-custom-scrollbars-2';
import { Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { closeAddPopup } from '@/common/store/slices/common';
import { RiArrowDropDownLine, RiArrowDropUpLine  } from "react-icons/ri";
import { FaCalendarAlt } from "react-icons/fa";

const categories = [
    "Danger",
    "Warning",
    "Success",
    "Info"
]

function AddContactForm(){
    const {
        register,
        control,
        handleSubmit,
        reset,
        trigger,
        setError,
        watch,
        setValue,
        formState: { errors },
      } = useForm();
      const dispatch = useDispatch();
      const popup = useSelector((state) => state.common.addPopup);
      const handleClose = () => {
        dispatch(closeAddPopup());
        reset();
      };
      const [statusChecked, setStatusChecked] = useState(true);
      return (
        <Modal
          title = "Add Contact"
          closeOnClickOutside={true}
          removeScrollProps={{
            allowPinchZoom: false, // Allow pinch to zoom on mobile devices
          }}
          overlayProps={{
            blur: 1,
            opacity: 1.8,
          }}
          size='35rem'
          withCloseButton={true}
          opened={popup.status}
          onClose={handleClose}
          centered
          classNames={{
            root: '',
            body: '!w-full !rounded-full',
            header : '!px-10 !bg-primary-card',
            title : '!text-[1.7rem]',
            content : '!py-8 !bg-primary-card',
            close : '!rounded-[50%] hover:!bg-orange-500 hover:!text-white'
          }}
          fullScreen={false}
        >
          <form className='flex flex-col flex-auto w-[100%] text-white'>
            <div className='flex flex-col gap-y-5 p-4 md:p-7 rounded-lg'>
                <Controller
                name='name'
                control={control}
                rules={{
                    required: 'Name is required!',
                }}
                render={({ field }) => (
                    <TextInput
                    {...field}
                    label='Name'
                    placeholder='Enter name'
                    withAsterisk
                    error={''}
                    classNames={{
                        label: '!font-medium md:!text-base !text-primary-gray !mb-2',
                        input: 'md:!h-[3rem] !rounded-lg md:!text-base !text-dune !text-white !border-1 focus:!border-orange-500 !border-[#464547]',
                    }}
                    />
                )}
                />

                <Controller
                name='email'
                control={control}
                rules={{
                    required: 'Email is required!',
                }}
                render={({ field }) => (
                    <TextInput
                    {...field}
                    label='Email Address'
                    placeholder='Enter email address'
                    error={''}
                    classNames={{
                        label: '!font-medium md:!text-base !text-primary-gray !mb-2',
                        input: 'md:!h-[3rem] !rounded-lg md:!text-base !text-dune !text-white !border-1 focus:!border-orange-500 !border-[#464547]',
                    }}
                    />
                )}
                />
                <Controller
                name='contact'
                control={control}
                rules={{
                    required: 'Contact is required!',
                }}
                render={({ field }) => (
                    <TextInput
                    {...field}
                    label='Contact Number'
                    placeholder='Enter contact number'
                    withAsterisk
                    error={''}
                    classNames={{
                        label: '!font-medium md:!text-base !text-primary-gray !mb-2',
                        input: 'md:!h-[3rem] !rounded-lg md:!text-base !text-dune !text-white !border-1 focus:!border-orange-500 !border-[#464547]',
                    }}
                    />
                )}
                />
                <div className='flex flex-col gap-2'>
                    <span>Status</span>
                    <Controller
                    name='status'
                    control={control}
                    rules={{
                        required: 'Status is required!',
                    }}
                    render={({ field }) => (
                        <Switch
                        checked={statusChecked}
                        onChange={(event) => setStatusChecked(event.currentTarget.checked)}
                        size='md'
                        classNames={{
                            track: `${statusChecked ? '!bg-green-600' : '!bg-red-600'} !border-0 hover:!cursor-pointer`,
                            thumb : '!bg-white !border-0'
                        }}
                    />
                    )}
                    />
                </div>
            </div>
            <Button
                // leftSection={<img src="/assets/icons/add.svg" alt="add" />}
                classNames={{
                root: "!bg-orange-500 !px-6 !py-4 !rounded-full !w-[200px] !h-full !ml-[32%] !mt-3",
                label: "!font-semibold !text-white !text-[1.1rem]",
                }}
                onClick={handleClose}
            >
                Submit
            </Button>
        </form>
        </Modal>
      );
}

export default AddContactForm