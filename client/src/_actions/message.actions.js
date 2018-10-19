import { messageConstants } from '../constants';
import { messageService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';



export const messageActions = {
    save
};

function save(message) {
    return dispatch => {
        dispatch(request(message));

        messageService.save(message)
            .then(
                () => { 
                    dispatch(success());
                    history.push('/inbox');
                    dispatch(alertActions.success('پیام شما با موفقیت ارسال گردید'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(message) { return { type: messageConstants.SAVE_REQUEST, message } }
    function success(message) { return { type: messageConstants.SAVE_SUCCESS, message } }
    function failure(error) { return { type: messageConstants.SAVE_FAILURE, error } }
}