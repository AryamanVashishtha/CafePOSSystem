import React from "react";
import { useEffect, useState, useContext } from "react";
import Layout from '../../components/layout/Layout'
import { fireDB } from '../../fireabase/FirebaseConfig';
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from 'react-router';
import { decryptText } from '../../utils/encryptionConfig';
import myContext from '../../context/data/myContext'
import { toast } from 'react-toastify'

const OrderInfo = () => {
    const [order, setOrder] = useState(null);
    const params = useParams();
    const paymentId = decryptText(params.id);
    const context = useContext(myContext);
    const { mode } = context;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const orderCollection = collection(fireDB, "order");
                const q = query(orderCollection, where("paymentId", "==", paymentId));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const orderData = querySnapshot.docs[0].data(); // Assuming each payment ID is unique
                    setOrder(orderData);
                } else {
                    console.log("Order not found");
                }
            } catch (error) {
                console.error("Error fetching order:", error);
            }
        };

        fetchOrder();
    }, [paymentId]);

    const updateOrder = async (paymentId, updateData) => {
        try {
            const orderCollection = collection(fireDB, "order");
            const q = query(orderCollection, where("paymentId", "==", paymentId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docRef = querySnapshot.docs[0].ref;
                await updateDoc(docRef, updateData);
                console.log("Order updated successfully");

                // Navigate to the same page to trigger a re-fetch without page reload
                navigate(0);  // Equivalent to reloading the current page

                if (updateData.isServed === "1") {
                    toast.success("Marked as Served");
                } else if (updateData.isServed === "0") {
                    toast.info("Marked as not Served");
                }
            } else {
                console.log("No order found with this payment ID");
            }
        } catch (error) {
            console.error("Error updating order:", error);
        }
    };

    const handleUpdateStatus = (status) => {
        const updateData = { isServed: status };
        updateOrder(paymentId, updateData);
    };

    if (!order) {
        return <div>Loading order...</div>;
    }

    return (
        <Layout>
            <div className={`bg-gray-100 pt-5 pb-20 ${mode === 'dark' ? 'bg-gray-800 text-white' : ''}`}>
                <div className="text-center mb-5 flex justify-center">
                    <h1
                        className="text-3xl font-semibold"
                        style={{
                            color: Number(order.isServed) === 1
                                ? (mode === 'dark' ? 'lightgreen' : 'green')
                                : (mode === 'dark' ? 'lightcoral' : 'red')
                        }}
                    >
                        {Number(order.isServed) === 1 ? 'This order has been Served' : 'This order has Not been Served'}
                    </h1>
                </div>
                <div className=" md:mx-20 relative overflow-x-auto mb-16 mx-0">
                    <h1 className='text-center mb-5 text-3xl font-semibold underline'>
                        Order Details
                    </h1>
                    <table className={`w-full text-sm text-left text-gray-500 ${mode === 'dark' ? 'text-gray-400' : ''}`}>
                        <thead className={`text-xs text-black uppercase bg-gray-200 ${mode === 'dark' ? 'bg-gray-700' : ''}`}>
                            <tr>
                                <th className="px-6 py-3">Title</th>
                                <th className="px-6 py-3">Image</th>
                                <th className="px-6 py-3">Price</th>
                                <th className="px-6 py-3">Category</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Phone Number</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Served</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.cartItems && order.cartItems.map((item, index) => {
                                const { title, category, imageUrl, price } = item;
                                return (
                                    <tr key={index} className="bg-gray-50 border-b dark:border-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                                        <td className="px-6 py-4" style={{ color: mode === 'dark' ? 'white' : '' }}>{title}</td>
                                        <td className="px-6 py-4"><img className='w-16' src={imageUrl} alt="img" /></td>
                                        <td className="px-6 py-4" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{price}</td>
                                        <td className="px-6 py-4" style={{ color: mode === 'dark' ? 'white' : '' }}>{category}</td>
                                        <td className="px-6 py-4" style={{ color: mode === 'dark' ? 'white' : '' }}>{order.addressInfo.name}</td>
                                        <td className="px-6 py-4" style={{ color: mode === 'dark' ? 'white' : '' }}>{order.addressInfo.phoneNumber}</td>
                                        <td className="px-6 py-4" style={{ color: mode === 'dark' ? 'white' : '' }}>{order.date}</td>
                                        <td className="px-6 py-4" style={{ color: mode === 'dark' ? 'white' : '' }}>{order.isServed == 1 ? '✅' : '❌'}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-evenly">
                    <button
                        onClick={() => handleUpdateStatus("1")}
                        className="font-medium border-b-2 border-blue-500 bg-[#605d5d12] text-blue-500 rounded-lg text-xl hover:shadow-green-700 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center mx-auto"
                    >
                        Mark as Served
                    </button>
                    <button
                        onClick={() => handleUpdateStatus("0")}
                        className="font-medium border-b-2 border-red-500 bg-[#605d5d12] text-red-500 rounded-lg text-xl hover:shadow-green-700 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center mx-auto"
                    >
                        Mark as Not Served
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default OrderInfo;
