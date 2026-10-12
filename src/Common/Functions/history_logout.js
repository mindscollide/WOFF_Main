// Holds react-router's navigate() (set from Login/Header/Dashboard via
// useNavigate) so Redux action creators outside the component tree can
// redirect, e.g. Helper.navigate("/") on session expiry.
class Helper {
  static navigate = null;
}
export default Helper;
