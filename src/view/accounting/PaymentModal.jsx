
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import DefaultSelect from "../../components/Forms/DefaultSelect";
import DefaultInput from "../../components/Forms/DefaultInput";
import Button from "../../components/Button/Button";
import { bankNames } from "../../components/Data/bankname";
import { closeModal } from "../../features/modal/modalSlice";
import { useDispatch } from "react-redux";
const PaymentModal = () => {
    const methods = useForm();
    const { handleSubmit, watch, reset, register } = methods;
    const [activeTab, setActiveTab] = useState("mobile");
    const dispatch = useDispatch();
    const onSubmit = async (data) => {
        console.log(data);
        try {
            // const response = await CodeSetting(payload).unwrap();
            //save payment data
            // dispatch(setPaidStatus(true));
            // ✅ Success message
            toast.success("Payment saved successfully!", {
                position: "top-right",
                autoClose: 3000,
            });

            dispatch(closeModal());
            // userId.setPaidStatus(true);
            // userId.showToast("Payment successful!");
        } catch (err) {
            console.error(err);

            // ✅ Error message
            let errorMessage = "Something went wrong!";
            if (err?.data?.error) {
                errorMessage = err.data.error;
            }

            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 5000,
            });
        }
    };
    const showTab = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="app mx-auto p-4">
            <div className="nav">
                <button
                    className={`nav-btn ${activeTab === "mobile" ? "active" : ""}`}
                    onClick={() => showTab("mobile")}
                >
                    Mobile Payment
                </button>
                <button
                    className={`nav-btn ${activeTab === "bank" ? "active" : ""}`}
                    onClick={() => showTab("bank")}
                >
                    Bank Payment
                </button>
            </div>

            <FormProvider {...methods}> 
                {activeTab === "mobile" && (  
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <DefaultSelect
                            options={[
                                { paymentMethod: 1, name: "Bikash" },
                                { paymentMethod: 2, name: "Rocket" },
                                { paymentMethod: 3, name: "Nagad" },
                            ]}
                            require={"Payment Method is required"}
                            nameField={"name"}
                            valueField={"paymentMethod"}
                            registerKey={"paymentMethod"}
                            type={"number"}
                            label={"Payment Method"}
                        />
                        <DefaultInput
                            registerKey="mobile_number"
                            label="Mobile Number"
                            type="phone"
                            require={"Mobile Number is required"}
                        />
                        <DefaultInput
                            registerKey="transactionId"
                            label="Transaction ID"
                            type="text"
                            require={"Transaction ID is required"}
                        />
                        <Button type="submit" className="!rounded-full">Pay Now</Button>
                    </form>
                )}

                {activeTab === "bank" && (  // ✅ Render only the active tab
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <DefaultSelect
                            label={"Bank Name"}
                            options={bankNames}
                            require={"Bank Name is required"}
                            nameField={"BankName"}
                            valueField={"paymentMethod"}
                            registerKey={"paymentMethod"}
                            type={"number"}
                        />
                        <DefaultInput
                            registerKey="acc_name"
                            label="Account Name"
                            type="text"
                            require={"Account Name is required"}
                        />
                        <DefaultInput
                            registerKey="acc_number"
                            label="Account Number"
                            type="text"
                            require={"Account Number is required"}
                        />
                        <DefaultInput
                            registerKey="branch_name"
                            label="Branch Name"
                            type="text"
                            require={"Branch Name is required"}
                        />
                        <DefaultInput
                            registerKey="routing_number"
                            label="Routing Number"
                            type="text"
                            require={"Routing Number is required"}
                        />
                        <Button type="submit" className="!rounded-full">Pay Now</Button>
                    </form>
                )}
            </FormProvider>
        </div>
    );
};

export default PaymentModal;
