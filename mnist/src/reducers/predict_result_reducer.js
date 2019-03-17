const res = 'result'
const logout = 'logout'

export default function (state = null, action) {
    switch (action.type) {
        case res:
            return action.payload || false;
        case logout:
            return state=null;
        default:
            return state;
    }
}