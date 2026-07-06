import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Service from "./pages/Service";
import AIAssistant from "./pages/ai-assistant";
import Contact from "./pages/Contact";
import Support from "./pages/Support";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import AboutUs from "./pages/AboutUs";
import FindCA from "./pages/FindCA";
import Blogs from "./pages/Blogs";
import VendorDetails from "./pages/VendorDetails"
import VendorAppointments from "./pages/VendorAppointments"
import VendorAvailability from "./pages/VendorAvailability"
import VendorDashboard from "./pages/VendorDashboard";
import VendorProfile from "./pages/VendorProfile";
import VendorKyc from "./pages/VendorKyc";
import VendorServices from "./pages/VendorServices";
import VendorSettings from "./pages/VendorSettings";
import VendorSubscription from "./pages/VendorSubscription";
import VendorPreview from "./pages/VendorPreview";
import PricingPlans from "./pages/PricingPlans";
import UserDashboard from "./pages/UserDashboard";
import UserProfile from "./pages/UserProfile";
import UserBusinessDetails from "./pages/UserBusinessDetails";
import UserUploadedDocuments from "./pages/UserUploadedDocuments";
import UserAccountVerification from "./pages/UserAccountVerification";
import UserSavedCA from "./pages/UserSavedCA.jsx";
import UserEnquiry from "./pages/UserEnquiry.jsx";
import UserHelp from "./pages/UserHelp";
import UserSettings from "./pages/UserSettings";
import FreeEnquiry from "./pages/FreeEnquiry"
import VendorPayment from "./pages/VendorPayment";
import BookConsultation from "./pages/BookConsultation";
import Admin from "./pages/Admin";
import AdminProtectedRoute from "./pages/AdminProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminLeads from "./pages/AdminLeads";
import AdminSupport from "./pages/AdminSupport";
import VendorLeads from "./pages/VendorLeads";
import LeadDetails from "./pages/LeadDetails";
import UserAppointments from "./pages/UserAppointments";
import VendorHelp from "./pages/VendorHelp";
import BlogDetails from "./pages/BlogDetails";
import AdminBlogs from "./pages/AdminBlogs";
import AdminBlogDetails from "./pages/AdminBlogDetails";
import AdminVendors from "./pages/AdminVendors";
import AdminAppointments from "./pages/AdminAppointments";


function Layout() {
  const location = useLocation();




  const dashboardRoutes = [
    "/vendor-dashboard",
    "/vendor-profile",
    "/vendor-kyc",
    "/vendor-services",
    "/vendor-preview",
    "/vendor-payment",
    "/user-dashboard",
    "/user-profile",
    "/user-business-details",
    "/user-uploaded-documents",
    "/user-account-verification",
    "/admin",
    "/admin-dashboard",
     "/admin-support",
    "/vendor-leads",
    "/lead-details",
    "/admin-vendors",
    "/admin-users",
     "/admin-appointments",
    "/login",
    "/user-saved-ca",
    "/user-enquiry",
    "/user-appointments",
    "/vendor-appointments",
    "/vendor-availability",
    "/vendor-settings",
    "/vendor-help",
    "/user-help",
     "/user-settings",
      "/vendor-subscription",
      "/pricing-plans",
     
  ];

  const hideNavbarFooter =
    dashboardRoutes.some(route =>
      location.pathname.startsWith(route)
    );

  console.log("PATH:", location.pathname);
  console.log("HIDE:", hideNavbarFooter);

  return (
    <>
      {!hideNavbarFooter && <Navbar />}

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/service" element={<Service />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/support" element={<Support />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/termsandconditions" element={<TermsAndConditions />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/find-ca" element={<FindCA />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/vendor/:id" element={<VendorDetails />} />
        <Route path="/free-enquiry/:vendorId" element={<FreeEnquiry />} />
        <Route path="/book-consultation/:id" element={<BookConsultation />} />



        {/* Admin Pages */}

        <Route path="/admin" element={<Admin />} />
        <Route
          path="/admin-dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />


        <Route
          path="/lead-details/:id"
          element={<LeadDetails />}
        />
        {/* Admin */}

        <Route
          path="/admin-blogs"
          element={<AdminBlogs />}
        />

        <Route
          path="/admin-blog-details"
          element={<AdminBlogDetails />}
        />

        {/* Frontend */}

        <Route
          path="/blogs"
          element={<Blogs />}
        />

        <Route
          path="/blog/:slug"
          element={<BlogDetails />}
        />


        <Route
          path="/admin-vendors"
          element={<AdminVendors />}
        />





        <Route
          path="/admin-users"
          element={<AdminUsers />}
        />






        <Route
          path="/admin-leads"
          element={<AdminLeads />}
        />





        <Route
          path="/admin-support"
          element={<AdminSupport />}
        />

 

        <Route
          path="/admin-appointments"
          element={<AdminAppointments />}
        />








        {/* Vendor Pages */}
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />
        <Route path="/vendor-profile" element={<VendorProfile />} />
        <Route path="/vendor-kyc" element={<VendorKyc />} />
        <Route path="/vendor-services" element={<VendorServices />} />
        <Route path="/vendor-preview" element={<VendorPreview />} />
        <Route path="/vendor-payment" element={<VendorPayment />} />
        <Route path="/vendor-leads" element={<VendorLeads />} />
        <Route path="/vendor-appointments" element={<VendorAppointments />} />
        <Route path="/vendor-availability" element={<VendorAvailability />} />
        <Route path="/vendor-settings" element={<VendorSettings />} />
        <Route path="/vendor-help" element={<VendorHelp />} />
         <Route path="/vendor-subscription" element={<VendorSubscription />} />
          <Route path="/pricing-plans" element={<PricingPlans />} />

        {/* User Pages */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/user-business-details" element={<UserBusinessDetails />} />
        <Route path="/user-uploaded-documents" element={<UserUploadedDocuments />} />
        <Route path="/user-account-verification" element={<UserAccountVerification />} />
        <Route path="/user-saved-ca" element={<UserSavedCA />} />
        <Route path="/user-enquiry" element={<UserEnquiry />} />
        <Route path="/user-appointments" element={<UserAppointments />} />
        <Route path="/enquiry-details/:id" element={<FreeEnquiry />} />
        <Route path="/user-help" element={<UserHelp />} />
         <Route path="/user-settings" element={<UserSettings />} />


      </Routes>

      {!hideNavbarFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;