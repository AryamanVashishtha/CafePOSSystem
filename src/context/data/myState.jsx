import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import MyContext from './myContext';
import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../../fireabase/FirebaseConfig';

function MyState(props) { 
    const [mode, setMode] = useState('dark'); 

    useEffect(() => {
        document.body.style.backgroundColor = mode === 'dark' ? "rgb(17, 24, 39)" : "white";
    }, [mode]);

    const toggleMode = () => {
        setMode((prevMode) => {
            const newMode = prevMode === 'light' ? 'dark' : 'light';
            document.body.style.backgroundColor = newMode === 'dark' ? "rgb(17, 24, 39)" : "white";
            return newMode;
        });
    };

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState({
        title: null, price: null, imageUrl: null, category: null, inStock: null,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    });

    const addProduct = async () => {
        if (!products.title || !products.price || !products.imageUrl || !products.category || !products.inStock) {
            return toast.error("All fields are required");
        }
        setLoading(true);
        try {
            await addDoc(collection(fireDB, 'products'), products);
            toast.success("Product added successfully");
            setTimeout(() => window.location.href = '/dashboard', 800);
            getProductData();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const [product, setProduct] = useState([]);

    const getProductData = () => {
        setLoading(true);
        // Define async function inside the useEffect and call it
        const fetchProductData = async () => {
            try {
                const q = query(collection(fireDB, 'products'), orderBy('time'));
                const data = onSnapshot(q, (QuerySnapshot) => {
                    const productArray = [];
                    QuerySnapshot.forEach((doc) => productArray.push({ ...doc.data(), id: doc.id }));
                    setProduct(productArray);
                });
                return () => data; // Cleanup
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductData();
    };

    useEffect(() => {
        getProductData();
    }, []);

    const edithandle = (item) => setProducts(item);

    const updateProduct = async () => {
        setLoading(true);
        try {
            await setDoc(doc(fireDB, 'products', products.id), products);
            toast.success("Product updated successfully");
            setTimeout(() => window.location.href = '/dashboard', 800);
            getProductData();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (item) => {
        setLoading(true);
        try {
            await deleteDoc(doc(fireDB, 'products', item.id));
            toast.success("Product deleted successfully");
            getProductData();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const [order, setOrder] = useState([]);

    const getOrderData = async () => {
        setLoading(true);
        try {
            const result = await getDocs(collection(fireDB, "order"));
            const ordersArray = [];
            result.forEach((doc) => ordersArray.push(doc.data()));
            setOrder(ordersArray);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const [user, setUser] = useState([]);

    const getUserData = async () => {
        setLoading(true);
        try {
            const result = await getDocs(collection(fireDB, "users"));
            const usersArray = [];
            result.forEach((doc) => usersArray.push(doc.data()));
            setUser(usersArray);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getOrderData();
        getUserData();
    }, []);

    return (
        <MyContext.Provider value={{
            mode, toggleMode, loading, setLoading,
            products, setProducts, addProduct, product,
            edithandle, updateProduct, deleteProduct, order,
            user
        }}>
            {props.children}
        </MyContext.Provider>
    );
}

// Add prop validation for `children`
MyState.propTypes = {
    children: PropTypes.node.isRequired
};

export default MyState;
