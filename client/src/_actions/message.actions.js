import { messageConstants } from '../constants';
import { messageService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';



export const messageActions = {
    save,
    getSent,
    getById
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

function getSent() {
    return dispatch => {
        dispatch(request());

        messageService.getSent()
            .then(
                messages => dispatch(success(messages)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: messageConstants.SENT_REQUEST } }
    function success(messages) { return { type: messageConstants.SENT_SUCCESS, messages } }
    function failure(error) { return { type: messageConstants.SENT_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request());

        messageService.getById(id)
            .then(
                msg => dispatch(success(msg)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: messageConstants.GETBYID_REQUEST } }
    function success(msg) { return { type: messageConstants.GETBYID_SUCCESS, msg } }
    function failure(error) { return { type: messageConstants.GETBYID_FAILURE, error } }
}