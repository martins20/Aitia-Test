import IUserShemaValidatorDTO from '@modules/users/dtos/IUserShemaValidatorDTO';
import GetValidationErrors from '@shared/errors/GetValidationErrors';
import UserShemaValidator from '../schemas/UserShemaValidator';
import AppError from '@shared/errors/AppError';

export default async function CheckYupErrors(
    data: IUserShemaValidatorDTO,
): Promise<void> {
    // check all if data is passed on schema
    await UserShemaValidator.validate(data, {
        abortEarly: false,
    }).catch(err => {
        const errors = GetValidationErrors(err);

        throw new AppError(errors);
    });
}
