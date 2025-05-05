class authControllers {
  admin_login = async (req, res) => {
    console.log(req.body);
  };
}
const authControllerInstance = new authControllers();
module.exports = authControllerInstance;
