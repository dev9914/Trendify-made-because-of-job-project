import Sidebar from "./components/Sidebar"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import { Routes,Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import SellerLogin from "./pages/SellerLogin"
import PrivateRoute from "./components/PrivateRoute"
import Product from "./components/Product"
import AddProduct from "./pages/AddProduct"
import ProductView from "./pages/ProductView"
import SellerUpload from "./pages/SellerUpload"
import RecentlyViewed from "./pages/RecentlyViewed"

function App() {
  return (
    // background: linear-gradient(to bottom, #171518 0%, #1d181d 80%, #251b25 100%);
    <>

    

    <Routes>
      <Route path='/' element={<SignIn/>} />
      <Route path='/sellerlogin' element={<SellerLogin/>} />
      <Route path='/signup' element={<SignUp/>} />

      {/* Protected Routes  */}
      <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/dashboard/product/:category" element={
           <PrivateRoute>
             <Product/>
         </PrivateRoute>
      }
         />

        <Route path="/dashboard/createproduct" element={
           <PrivateRoute>
             <AddProduct/>
         </PrivateRoute>
        } />
        <Route path="/dashboard/productview/:id" element={
           <PrivateRoute>
             <ProductView />
         </PrivateRoute>
        } />
        <Route path="/dashboard/sellerupload" element={
           <PrivateRoute>
             <SellerUpload />
         </PrivateRoute>
        } />
        <Route path="/dashboard/recentlyviewed" element={
           <PrivateRoute>
             <RecentlyViewed />
         </PrivateRoute>
        } />
    </Routes>

    </>
  )
}

export default App
