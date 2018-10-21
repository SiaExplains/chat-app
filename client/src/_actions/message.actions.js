import { messageConstants } from '../constants';
import { messageService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';



export const messageActions = {
    save,
    getSent,
    getById,
    getInbox,
    getDraft

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

function getInbox() {
    return dispatch => {
        dispatch(request());

        messageService.getInbox()
            .then(
                inbox => dispatch(success(inbox)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: messageConstants.INBOX_REQUEST } }
    function success(inbox) { return { type: messageConstants.INBOX_SUCCESS, inbox } }
    function failure(error) { return { type: messageConstants.INBOX_FAILURE, error } }
}

function getDraft() {
    return dispatch => {
        dispatch(request());

        messageService.getDraft()
            .then(
                messages => dispatch(success(messages)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: messageConstants.DRAFT_REQUEST } }
    function success(messages) { return { type: messageConstants.DRAFT_SUCCESS, messages } }
    function failure(error) { return { type: messageConstants.DRAFT_FAILURE, error } }
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