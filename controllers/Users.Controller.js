const form_login = (req, res) => {
    res.json({ msg: 'Inicia sesion' });
};

const form_register = (req, res) => {
    res.json({ msg: 'Registro' });
};

export {
    form_login,
    form_register
}