module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '254147aa726fc6c512a003f6935de326'),
  },
});
