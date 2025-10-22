import _Map "mo:base/OrderedMap";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import _Nat "mo:base/Nat";

module {
    public type AdminOnlySystemState = {
        var adminPrincipal : ?Principal;
    };
    
    public func initState() : AdminOnlySystemState {
        {
            var adminPrincipal = null;
        }
    };
    
    // Initialize auth with the first caller becoming admin
    public func initializeAuth(state: AdminOnlySystemState, caller: Principal) {
        if (Principal.isAnonymous(caller)) {
            Debug.trap("Anonymous principals cannot be admin");
        };

        switch (state.adminPrincipal) {
            case (?_) { };
            case null {
                state.adminPrincipal := ?caller;
            };
        };
    };

    private func hasAdminPermission(state: AdminOnlySystemState, caller : Principal) : Bool {
        switch (state.adminPrincipal) {
            case (?admin) { caller == admin };
            case null { false };
        };
    };

    public func isCurrentUserAdmin(state: AdminOnlySystemState, caller: Principal) : Bool {
        hasAdminPermission(state, caller);
    };

    // Returns the current admin principal, if set
    public func getAdminPrincipal(state: AdminOnlySystemState) : ?Principal {
        state.adminPrincipal
    };

    // Transfer admin to a new principal. Only current admin can call this.
    public func transferAdmin(state: AdminOnlySystemState, caller: Principal, newAdmin: Principal) {
        if (not hasAdminPermission(state, caller)) {
            Debug.trap("Unauthorized: Only current admin can transfer admin");
        };
        if (Principal.isAnonymous(newAdmin)) {
            Debug.trap("Cannot set anonymous as admin");
        };
        state.adminPrincipal := ?newAdmin;
    };
}