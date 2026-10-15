/* ---- Shared photo library (Unsplash, free to use) ---- */
window.IMG = (function () {
  const ID = {
    exam:'1766310549795-dd0fc75d499f', examTest:'1576210117723-cd06449a467d', phoropter:'1758656321519-02fb5f48dc7e',
    optom2:'1770221797840-8f5a095ad7ae', machine:'1539036776273-021ec1d78bec', chart:'1705357311681-17449eb278d1',
    eyeMacro:'1483519173755-be893fab1f46', eyeBlack:'1705071393219-7c0c65afa314', eyeGreen:'1612804327354-d29af30ac8a6',
    eyeBlue:'1599114317549-8d4e5233021f', eyeGold:'1627502208346-b835b72c0f05', eyeBrown:'1578903279423-9fe363f1f7b1',
    microscope:'1632054227742-67e0e23595b0', surgery:'1742627541273-33ebe14bf1f3', loupe:'1542432389-a40026383873',
    rack:'1486250944723-86bca2b15b06', rack2:'1544177586-c9b9fb1f45c2', shop:'1788347101988-bf40abcbb2c7', shop2:'1788347101825-f3a560ec1e2d',
    sunShelf:'1789016862722-44d59fa0f80f', sunWall:'1776890948428-5cb3e62cc680', glassesSilver:'1615468822882-4828d2602857',
    glassesBlack:'1577410114274-ef015b5b6d29', holdGlasses:'1517948430535-1e2469d314fe', womanGlasses:'1604781099561-c70393a38a6d',
    kid1:'1742321694002-77d33db25f68', kid2:'1594918794521-a0c01cdff8c0', kid3:'1593194777536-e155e6d100b2', kidBoy:'1758612898701-e2f2958f219d',
    neon:'1773846969630-cbbbd76ab5ad', doctor:'1514416205405-075ab2f15964', glassesCase:'1762718900539-c51799fd71b3'
  };
  const url = (k, w) => 'https://images.unsplash.com/photo-' + (ID[k] || k) + '?auto=format&fit=crop&w=' + (w || 800) + '&q=75';
  // Returns an <img> that fills a .photo container and removes itself if it fails to load.
  const tag = (k, alt, w, extra) => '<img src="' + url(k, w) + '" alt="' + String(alt).replace(/"/g, '&quot;') + '" class="absolute inset-0 w-full h-full object-cover ' + (extra || '') + '" loading="lazy" decoding="async" onerror="this.remove()">';
  const SERVICE = { 'srv-eye-test':'exam', 'srv-cataract':'eyeMacro', 'srv-lasik':'eyeBlack', 'srv-glaucoma':'machine', 'srv-retina':'phoropter', 'srv-paeds':'kid1', 'srv-contacts':'eyeGreen', 'srv-glasses':'rack' };
  const PRODUCT = { 'p-001':'rack2', 'p-002':'glassesSilver', 'p-003':'rack', 'p-004':'sunWall', 'p-005':'sunShelf', 'p-006':'kid2', 'p-007':'eyeBlue', 'p-008':'eyeBrown', 'p-009':'glassesBlack', 'p-010':'holdGlasses' };
  return { url, tag, SERVICE, PRODUCT };
})();