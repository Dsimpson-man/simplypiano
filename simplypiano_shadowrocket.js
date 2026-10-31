/*
 * Simply Piano Premium Unlock
 * Domains: asla.joytunes.com / alicdn.joytunescn.com
 * Author: you
 */

var body = $response.body;
var url = $request.url;

// Restore purchase: fix error
if (url.indexOf("loginToAccountOfRestoredPurchase") !== -1) {
    body = body.replace(/"error":"[^"]*"/g, '"error":null');
    $done({ body });
    return;
}

// Account authenticate: upgrade to premium
if (url.indexOf("accountAuthenticate") !== -1) {
    body = body.replace(/"membershipType":"FREE"/g, '"membershipType":"JOYTUNESBUNDLE"');
    body = body.replace(/"membershipTier":"free_home"/g, '"membershipTier":"premium_home"');
    body = body.replace(/"membershipDescription":"未订阅"/g, '"membershipDescription":"高级会员"');
    body = body.replace(/"homeMembershipTier":"free_home"/g, '"homeMembershipTier":"premium_home"');
    body = body.replace(/"profilesAccess":null/g, '"profilesAccess":"FAMILY"');
    body = body.replace(/"planDuration":"unknown"/g, '"planDuration":"oneyear"');
    body = body.replace(/"daysRemaining":null/g, '"daysRemaining":366');
    body = body.replace(/"autoRenewable":0/g, '"autoRenewable":1');
    body = body.replace(/"dateStarted":null/g, '"dateStarted":"2023-10-14"');
    body = body.replace(/"currentIapID":null/g, '"currentIapID":"com.joytunes.asla.oneyearpremiummembership_trial_180_mpma_fp_5profiles_bundle"');
    body = body.replace(/"openProductIDs":\[\]/g, '"openProductIDs":["com.joytunes.asla.oneyearpremiummembership_trial_180_mpma_fp_5profiles_bundle"]');
}

$done({ body });
