function asyncErrorBoundary(delegate, defaultState) {
    return (req, res, next) => {
        Promise.resolve()
            .then(() => delegate(req, res, next))
            .catch((error = {}) => {
                const { status = defaultState, message = error } = error;
                next({ status, message });
            });
    }
}

module.exports = asyncErrorBoundary;