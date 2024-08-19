import { Button, Group, Menu, Modal, MultiSelect, Select, TextInput } from '@mantine/core';
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

function AddEventForm(){
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

      return (
        <Modal
          title = "Add Event"
          closeOnClickOutside={true}
          removeScrollProps={{
            allowPinchZoom: true, // Allow pinch to zoom on mobile devices
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
                name='event_name'
                control={control}
                rules={{
                    required: 'Event name is required!',
                }}
                render={({ field }) => (
                    <TextInput
                    {...field}
                    label='Event Name'
                    placeholder='Enter event name'
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
                rules={{
                    required: 'Event date is required',
                }}
                name='event_date'
                control={control}
                render={({ field }) => (
                    <DateInput 
                    {...field}
                    withAsterisk
                    label='Event Date'
                    placeholder='Enter event date'
                    classNames={{
                        label:
                        '!w-[10rem] !font-medium md:!text-base !text-primary-gray !pb-1 !mb-1',
                        input: 'md:!h-[3rem] !rounded-lg md:!text-base !text-white !border-1 focus:!border-orange-500 !border-[#464547]',
                        calendarHeader : '!flex !flex-row !items-center !justify-between  !w-full',
                        calendarHeaderControl : '!w-[80px] !p-1 ',
                        calendarHeaderLevel : '!p-1'
                    }}
                    rightSection={
                        <FaCalendarAlt/>
                    }
                    comboboxProps={{ withinPortal: true }}
                    error={errors?.brand?.message}
                    />
                )}
                />
                <Controller
                rules={{
                    required: 'Category is required',
                }}
                name='category'
                control={control}
                render={({ field }) => (
                    <Select
                    {...field}
                    withAsterisk
                    label='Category'
                    placeholder='Choose Category'
                    data={
                        categories
                    }
                    classNames={{
                        label:
                        '!w-[10rem] !font-medium md:!text-base !text-primary-gray !pb-1 !mb-1',
                        input: '!rounded-lg md:!text-base !text-white !h-[3rem] !border-1 focus:!border-orange-500 !border-[#464547]',
                        empty: '!w-full',
                        pill: 'md:!text-base !text-primary-gray',
                        option : '!text-white hover:!text-black',
                        dropdown : '!border-1 !border-[#464547]'
                    }}
                    rightSection={
                        <RiArrowDropDownLine size={30}/>
                    }
                    comboboxProps={{ withinPortal: true }}
                    error={errors?.articles?.message}
                    />
                )}
                />
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

export default AddEventForm