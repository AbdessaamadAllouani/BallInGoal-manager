const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
 const PrivateRoute = ({ roleRequired }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div>
                <Loader />
            </div>
        ); // Affichage d’un état de chargement clair
        return <Loader />;
    }

    if (!user) {
        return <Navigate to="/" replace />; // Rediriger vers la page de connexion si non authentifié
        return <Navigate to="/" replace />;
    }

    // Vérification de la configuration initiale pour les formateurs
    if (user.role === 'formateur' && !user.initial_setup_completed) {
        if (!user.email_verified_at) {
            return <Navigate to="/initial-setup" replace />;
        } else {
            return <Navigate to="/reset-password" replace />;
        }
    }

    if (roleRequired && user.role !== roleRequired) {
        return <Navigate to="/" replace />; // Redirection si l'utilisateur n'a pas le bon rôle
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
 export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Route publique */}
                <Route path="/" element={<Login />} />

                {/* Routes accessibles uniquement par un utilisateur avec le rôle "admin" */}
                {/* Routes de configuration - accessibles sans authentification */}
                <Route path="/initial-setup" element={<InitialSetupForm />} />
                <Route path="/reset-password" element={<ResetPasswordForm />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Routes admin */}
                <Route element={<PrivateRoute roleRequired="admin" />}>
                    <Route path="/Home" element={<Home />} />
                    <Route
                    />
                </Route>

                {/* Routes accessibles uniquement par un utilisateur avec le rôle "formateur" */}
                {/* Routes formateur */}
                <Route element={<PrivateRoute roleRequired="formateur" />}>
                    {/* <Route
                        path="/FeuilleAbsence"
                        element={<f user={user} />}
                    /> */}
                    <Route path="/Homef" element={<Home />} />
                    <Route
                        path="FeuilleAbsence"
                        element={<UpdateAbsencesStag user={user} />}
                    />
                    <Route
                        path="/FeuilleAbsenceSoir"
                        element={<FeuilleAbsenceSoir user={user} />}
                        element={<UpdateAbsencesStag />}
                    />
                </Route>

                {/* Autres routes pour des actions publiques */}
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                {/* Routes publiques */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}