

// login = async (req, res, next) => {
//     try {
//       const OPERATION = 'Request authentication';
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         throw new ServiceException(OPERATION, ValidationError.BAD_INPUT, {
//           ...errors.mapped(),
//         });
//       }

//       const {
//         body: {countryId, phoneNumber, passcode, emailId},
//       } = req;

//       const allHeaders = req.headers;
//       const remoteIp = req.socket.remoteAddress;

//       const result = await authService.auth({
//         passcode,
//         countryId,
//         phoneNumber,
//         emailId,
//         allHeaders,
//         remoteIp,
//         OPERATION
//       });
//       return res.status(200).json(result);
//     } catch (err) {
//       next(err);
//     }
//   };