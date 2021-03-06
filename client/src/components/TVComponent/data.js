// https://bitquery.io/blog/pancake-swap-dex-apis
// https://github.com/vegaswap/sfrontend/issues/138

// TODO: Convert to use graphql
export function getOHLC() {
}

// daily data
export const exampleData = [
  { time: "2018-10-19", open: 180.34, high: 180.99, low: 178.57, close: 179.85 },
  { time: "2018-10-22", open: 180.82, high: 181.40, low: 177.56, close: 178.75 },
  { time: "2018-10-23", open: 175.77, high: 179.49, low: 175.44, close: 178.53 },
  { time: "2018-10-24", open: 178.58, high: 182.37, low: 176.31, close: 176.97 },
  { time: "2018-10-25", open: 177.52, high: 180.50, low: 176.83, close: 179.07 },
  { time: "2018-10-26", open: 176.88, high: 177.34, low: 170.91, close: 172.23 },
  { time: "2018-10-29", open: 173.74, high: 175.99, low: 170.95, close: 173.20 },
  { time: "2018-10-30", open: 173.16, high: 176.43, low: 172.64, close: 176.24 },
  { time: "2018-10-31", open: 177.98, high: 178.85, low: 175.59, close: 175.88 },
  { time: "2018-11-01", open: 176.84, high: 180.86, low: 175.90, close: 180.46 },
  { time: "2018-11-02", open: 182.47, high: 183.01, low: 177.39, close: 179.93 },
  { time: "2018-11-05", open: 181.02, high: 182.41, low: 179.30, close: 182.19 },
  { time: "2018-11-06", open: 181.93, high: 182.65, low: 180.05, close: 182.01 },
  { time: "2018-11-07", open: 183.79, high: 187.68, low: 182.06, close: 187.23 },
  { time: "2018-11-08", open: 187.13, high: 188.69, low: 185.72, close: 188.00 },
  { time: "2018-11-09", open: 188.32, high: 188.48, low: 184.96, close: 185.99 },
  { time: "2018-11-12", open: 185.23, high: 186.95, low: 179.02, close: 179.43 },
  { time: "2018-11-13", open: 177.30, high: 181.62, low: 172.85, close: 179.00 },
  { time: "2018-11-14", open: 182.61, high: 182.90, low: 179.15, close: 179.90 },
  { time: "2018-11-15", open: 179.01, high: 179.67, low: 173.61, close: 177.36 },
  { time: "2018-11-16", open: 173.99, high: 177.60, low: 173.51, close: 177.02 },
  { time: "2018-11-19", open: 176.71, high: 178.88, low: 172.30, close: 173.59 },
  { time: "2018-11-20", open: 169.25, high: 172.00, low: 167.00, close: 169.05 },
  { time: "2018-11-21", open: 170.00, high: 170.93, low: 169.15, close: 169.30 },
  { time: "2018-11-23", open: 169.39, high: 170.33, low: 168.47, close: 168.85 },
  { time: "2018-11-26", open: 170.20, high: 172.39, low: 168.87, close: 169.82 },
  { time: "2018-11-27", open: 169.11, high: 173.38, low: 168.82, close: 173.22 },
  { time: "2018-11-28", open: 172.91, high: 177.65, low: 170.62, close: 177.43 },
  { time: "2018-11-29", open: 176.80, high: 177.27, low: 174.92, close: 175.66 },
  { time: "2018-11-30", open: 175.75, high: 180.37, low: 175.11, close: 180.32 },
  { time: "2018-12-03", open: 183.29, high: 183.50, low: 179.35, close: 181.74 },
  { time: "2018-12-04", open: 181.06, high: 182.23, low: 174.55, close: 175.30 },
  { time: "2018-12-06", open: 173.50, high: 176.04, low: 170.46, close: 175.96 },
  { time: "2018-12-07", open: 175.35, high: 178.36, low: 172.24, close: 172.79 },
  { time: "2018-12-10", open: 173.39, high: 173.99, low: 167.73, close: 171.69 },
  { time: "2018-12-11", open: 174.30, high: 175.60, low: 171.24, close: 172.21 },
  { time: "2018-12-12", open: 173.75, high: 176.87, low: 172.81, close: 174.21 },
  { time: "2018-12-13", open: 174.31, high: 174.91, low: 172.07, close: 173.87 },
  { time: "2018-12-14", open: 172.98, high: 175.14, low: 171.95, close: 172.29 },
  { time: "2018-12-17", open: 171.51, high: 171.99, low: 166.93, close: 167.97 },
  { time: "2018-12-18", open: 168.90, high: 171.95, low: 168.50, close: 170.04 },
  { time: "2018-12-19", open: 170.92, high: 174.95, low: 166.77, close: 167.56 },
  { time: "2018-12-20", open: 166.28, high: 167.31, low: 162.23, close: 164.16 },
  { time: "2018-12-21", open: 162.81, high: 167.96, low: 160.17, close: 160.48 },
  { time: "2018-12-24", open: 160.16, high: 161.40, low: 158.09, close: 158.14 },
  { time: "2018-12-26", open: 159.46, high: 168.28, low: 159.44, close: 168.28 },
  { time: "2018-12-27", open: 166.44, high: 170.46, low: 163.36, close: 170.32 },
  { time: "2018-12-28", open: 171.22, high: 173.12, low: 168.60, close: 170.22 },
  { time: "2018-12-31", open: 171.47, high: 173.24, low: 170.65, close: 171.82 },
  { time: "2019-01-02", open: 169.71, high: 173.18, low: 169.05, close: 172.41 },
  { time: "2019-01-03", open: 171.84, high: 171.84, low: 168.21, close: 168.61 },
  { time: "2019-01-04", open: 170.18, high: 174.74, low: 169.52, close: 173.62 },
  { time: "2019-01-07", open: 173.83, high: 178.18, low: 173.83, close: 177.04 },
  { time: "2019-01-08", open: 178.57, high: 179.59, low: 175.61, close: 177.89 },
  { time: "2019-01-09", open: 177.87, high: 181.27, low: 177.10, close: 179.73 },
  { time: "2019-01-10", open: 178.03, high: 179.24, low: 176.34, close: 179.06 },
  { time: "2019-01-11", open: 177.93, high: 180.26, low: 177.12, close: 179.41 },
  { time: "2019-01-14", open: 177.59, high: 179.23, low: 176.90, close: 178.81 },
  { time: "2019-01-15", open: 176.08, high: 177.82, low: 175.20, close: 176.47 },
  { time: "2019-01-16", open: 177.09, high: 177.93, low: 175.86, close: 177.04 },
  { time: "2019-01-17", open: 174.01, high: 175.46, low: 172.00, close: 174.87 },
  { time: "2019-01-18", open: 176.98, high: 180.04, low: 176.18, close: 179.58 },
  { time: "2019-01-22", open: 177.49, high: 178.60, low: 175.36, close: 177.11 },
  { time: "2019-01-23", open: 176.59, high: 178.06, low: 174.53, close: 176.89 },
  { time: "2019-01-24", open: 177.00, high: 177.53, low: 175.30, close: 177.29 },
  { time: "2019-01-25", open: 179.78, high: 180.87, low: 178.61, close: 180.40 },
  { time: "2019-01-28", open: 178.97, high: 179.99, low: 177.41, close: 179.83 },
  { time: "2019-01-29", open: 178.96, high: 180.15, low: 178.09, close: 179.69 },
  { time: "2019-01-30", open: 180.47, high: 184.20, low: 179.78, close: 182.18 },
  { time: "2019-01-31", open: 181.50, high: 184.67, low: 181.06, close: 183.53 },
  { time: "2019-02-01", open: 184.03, high: 185.15, low: 182.83, close: 184.37 },
  { time: "2019-02-04", open: 184.30, high: 186.43, low: 183.84, close: 186.43 },
  { time: "2019-02-05", open: 186.89, high: 186.99, low: 184.69, close: 186.39 },
  { time: "2019-02-06", open: 186.69, high: 186.69, low: 184.06, close: 184.72 },
  { time: "2019-02-07", open: 183.74, high: 184.92, low: 182.45, close: 184.07 },
  { time: "2019-02-08", open: 183.05, high: 184.58, low: 182.72, close: 184.54 },
  { time: "2019-02-11", open: 185.00, high: 185.42, low: 182.75, close: 182.92 },
  { time: "2019-02-12", open: 183.84, high: 186.40, low: 183.52, close: 185.52 },
  { time: "2019-02-13", open: 186.30, high: 188.68, low: 185.92, close: 188.41 },
  { time: "2019-02-14", open: 187.50, high: 188.93, low: 186.00, close: 187.71 },
  { time: "2019-02-15", open: 189.87, high: 192.62, low: 189.05, close: 192.39 },
  { time: "2019-02-19", open: 191.71, high: 193.19, low: 191.28, close: 192.33 },
  { time: "2019-02-20", open: 192.39, high: 192.40, low: 191.11, close: 191.85 },
  { time: "2019-02-21", open: 191.85, high: 192.37, low: 190.61, close: 191.82 },
  { time: "2019-02-22", open: 191.69, high: 192.54, low: 191.62, close: 192.39 },
  { time: "2019-02-25", open: 192.75, high: 193.42, low: 189.96, close: 189.98 },
  { time: "2019-02-26", open: 185.59, high: 188.47, low: 182.80, close: 188.30 },
  { time: "2019-02-27", open: 187.90, high: 188.50, low: 183.21, close: 183.67 },
  { time: "2019-02-28", open: 183.60, high: 185.19, low: 183.11, close: 185.14 },
  { time: "2019-03-01", open: 185.82, high: 186.56, low: 182.86, close: 185.17 },
  { time: "2019-03-04", open: 186.20, high: 186.24, low: 182.10, close: 183.81 },
  { time: "2019-03-05", open: 184.24, high: 185.12, low: 183.25, close: 184.00 },
  { time: "2019-03-06", open: 184.53, high: 184.97, low: 183.84, close: 184.45 },
  { time: "2019-03-07", open: 184.39, high: 184.62, low: 181.58, close: 182.51 },
  { time: "2019-03-08", open: 181.49, high: 181.91, low: 179.52, close: 181.23 },
  { time: "2019-03-11", open: 182.00, high: 183.20, low: 181.20, close: 182.44 },
  { time: "2019-03-12", open: 183.43, high: 184.27, low: 182.33, close: 184.00 },
  { time: "2019-03-13", open: 183.24, high: 183.78, low: 181.08, close: 181.14 },
  { time: "2019-03-14", open: 181.28, high: 181.74, low: 180.50, close: 181.61 },
  { time: "2019-03-15", open: 182.30, high: 182.49, low: 179.57, close: 182.23 },
  { time: "2019-03-18", open: 182.53, high: 183.48, low: 182.33, close: 183.42 },
  { time: "2019-03-19", open: 184.19, high: 185.82, low: 183.48, close: 184.13 },
  { time: "2019-03-20", open: 184.30, high: 187.12, low: 183.43, close: 186.10 },
  { time: "2019-03-21", open: 185.50, high: 190.00, low: 185.50, close: 189.97 },
  { time: "2019-03-22", open: 189.31, high: 192.05, low: 188.67, close: 188.75 },
  { time: "2019-03-25", open: 188.75, high: 191.71, low: 188.51, close: 189.68 },
  { time: "2019-03-26", open: 190.69, high: 192.19, low: 188.74, close: 189.34 },
  { time: "2019-03-27", open: 189.65, high: 191.61, low: 188.39, close: 189.25 },
  { time: "2019-03-28", open: 189.91, high: 191.40, low: 189.16, close: 190.06 },
  { time: "2019-03-29", open: 190.85, high: 192.04, low: 190.14, close: 191.89 },
  { time: "2019-04-01", open: 192.99, high: 195.90, low: 192.85, close: 195.64 },
  { time: "2019-04-02", open: 195.50, high: 195.50, low: 194.01, close: 194.31 },
  { time: "2019-04-03", open: 194.98, high: 198.78, low: 194.11, close: 198.61 },
  { time: "2019-04-04", open: 199.00, high: 200.49, low: 198.02, close: 200.45 },
  { time: "2019-04-05", open: 200.86, high: 203.13, low: 200.61, close: 202.06 },
  { time: "2019-04-08", open: 201.37, high: 203.79, low: 201.24, close: 203.55 },
  { time: "2019-04-09", open: 202.26, high: 202.71, low: 200.46, close: 200.90 },
  { time: "2019-04-10", open: 201.26, high: 201.60, low: 198.02, close: 199.43 },
  { time: "2019-04-11", open: 199.90, high: 201.50, low: 199.03, close: 201.48 },
  { time: "2019-04-12", open: 202.13, high: 204.26, low: 202.13, close: 203.85 },
  { time: "2019-04-15", open: 204.16, high: 205.14, low: 203.40, close: 204.86 },
  { time: "2019-04-16", open: 205.25, high: 205.99, low: 204.29, close: 204.47 },
  { time: "2019-04-17", open: 205.34, high: 206.84, low: 205.32, close: 206.55 },
  { time: "2019-04-18", open: 206.02, high: 207.78, low: 205.10, close: 205.66 },
  { time: "2019-04-22", open: 204.11, high: 206.25, low: 204.00, close: 204.78 },
  { time: "2019-04-23", open: 205.14, high: 207.33, low: 203.43, close: 206.05 },
  { time: "2019-04-24", open: 206.16, high: 208.29, low: 205.54, close: 206.72 },
  { time: "2019-04-25", open: 206.01, high: 207.72, low: 205.06, close: 206.50 },
  { time: "2019-04-26", open: 205.88, high: 206.14, low: 203.34, close: 203.61 },
  { time: "2019-04-29", open: 203.31, high: 203.80, low: 200.34, close: 202.16 },
  { time: "2019-04-30", open: 201.55, high: 203.75, low: 200.79, close: 203.70 },
  { time: "2019-05-01", open: 203.20, high: 203.52, low: 198.66, close: 198.80 },
  { time: "2019-05-02", open: 199.30, high: 201.06, low: 198.80, close: 201.01 },
  { time: "2019-05-03", open: 202.00, high: 202.31, low: 200.32, close: 200.56 },
  { time: "2019-05-06", open: 198.74, high: 199.93, low: 198.31, close: 199.63 },
  { time: "2019-05-07", open: 196.75, high: 197.65, low: 192.96, close: 194.77 },
  { time: "2019-05-08", open: 194.49, high: 196.61, low: 193.68, close: 195.17 },
  { time: "2019-05-09", open: 193.31, high: 195.08, low: 191.59, close: 194.58 },
  { time: "2019-05-10", open: 193.21, high: 195.49, low: 190.01, close: 194.58 },
  { time: "2019-05-13", open: 191.00, high: 191.66, low: 189.14, close: 190.34 },
  { time: "2019-05-14", open: 190.50, high: 192.76, low: 190.01, close: 191.62 },
  { time: "2019-05-15", open: 190.81, high: 192.81, low: 190.27, close: 191.76 },
  { time: "2019-05-16", open: 192.47, high: 194.96, low: 192.20, close: 192.38 },
  { time: "2019-05-17", open: 190.86, high: 194.50, low: 190.75, close: 192.58 },
  { time: "2019-05-20", open: 191.13, high: 192.86, low: 190.61, close: 190.95 },
  { time: "2019-05-21", open: 187.13, high: 192.52, low: 186.34, close: 191.45 },
  { time: "2019-05-22", open: 190.49, high: 192.22, low: 188.05, close: 188.91 },
  { time: "2019-05-23", open: 188.45, high: 192.54, low: 186.27, close: 192.00 },
  { time: "2019-05-24", open: 192.54, high: 193.86, low: 190.41, close: 193.59 },
];

export const minutesData = [
  {
    time: "2020-11-01 00:00:00",
    open: 28.406914612410745,
    high: 28.673466689705428,
    low: 27.995310223693433,
    close: 28.447705322603326,
  },
  {
    time: "2020-11-02 00:00:00",
    open: 28.33666229248188,
    high: 29.30890044166806,
    low: 27.741922815293588,
    close: 27.85512676464847,
  },
  {
    time: "2020-11-03 00:00:00",
    open: 27.854299241235626,
    high: 27.925970841308917,
    low: 25.91801128371834,
    close: 26.97061755042005,
  },
  {
    time: "2020-11-04 00:00:00",
    open: 26.86311637086123,
    high: 26.981662948511214,
    low: 25.969812403284212,
    close: 26.91198568163484,
  },
  {
    time: "2020-11-05 00:00:00",
    open: 26.855114203922902,
    high: 27.99570020331366,
    low: 26.77684737584173,
    close: 27.7559227595162,
  },
  {
    time: "2020-11-06 00:00:00",
    open: 27.644989118368994,
    high: 29.58666750495022,
    low: 27.63992663733881,
    close: 28.939041634007204,
  },
  {
    time: "2020-11-07 00:00:00",
    open: 28.938911677735625,
    high: 29.84450813160485,
    low: 27.001668393316685,
    close: 27.835880197894465,
  },
  {
    time: "2020-11-08 00:00:00",
    open: 27.72566521875456,
    high: 28.736383448095385,
    low: 27.47270043339196,
    close: 28.27293628256248,
  },
  {
    time: "2020-11-09 00:00:00",
    open: 28.272533013004715,
    high: 28.932097081673927,
    low: 27.401748557553855,
    close: 28.043879311993702,
  },
  {
    time: "2020-11-10 00:00:00",
    open: 28.07002318802191,
    high: 28.49988570627453,
    low: 27.74288069062369,
    close: 28.251826621148158,
  },
  {
    time: "2020-11-11 00:00:00",
    open: 28.14018628808689,
    high: 28.581706700597156,
    low: 27.771632060992445,
    close: 27.87144100582449,
  },
  {
    time: "2020-11-12 00:00:00",
    open: 27.871223988876064,
    high: 28.115182716003773,
    low: 27.37124207236339,
    close: 27.678647488075576,
  },
  {
    time: "2020-11-13 00:00:00",
    open: 27.596152882855883,
    high: 28.540061500927866,
    low: 27.555701343835068,
    close: 28.157475285094385,
  },
  {
    time: "2020-11-14 00:00:00",
    open: 28.15718607642792,
    high: 28.239350564226665,
    low: 27.30761426339356,
    close: 27.91304433697333,
  },
  {
    time: "2020-11-15 00:00:00",
    open: 27.912686515498173,
    high: 28.201265550200652,
    low: 27.087744163677655,
    close: 27.63481240834917,
  },
  {
    time: "2020-11-16 00:00:00",
    open: 27.526109045071387,
    high: 28.235799735316597,
    low: 27.46293427116256,
    close: 28.09845005264684,
  },
  {
    time: "2020-11-17 00:00:00",
    open: 27.987120279968753,
    high: 28.843841601350306,
    low: 27.958250027412763,
    close: 28.553596266593924,
  },
  {
    time: "2020-11-18 00:00:00",
    open: 28.439664813274785,
    high: 28.77495141177587,
    low: 27.408565940076443,
    close: 27.996064848061746,
  },
  {
    time: "2020-11-19 00:00:00",
    open: 27.995872990801743,
    high: 28.433477393379192,
    low: 27.617745417878215,
    close: 28.012875324171546,
  },
  {
    time: "2020-11-20 00:00:00",
    open: 28.01242761067789,
    high: 29.302446354241738,
    low: 28.012117810979976,
    close: 28.949050715399395,
  },
  {
    time: "2020-11-21 00:00:00",
    open: 28.83319033796526,
    high: 30.798470684827098,
    low: 28.343784436787825,
    close: 30.527907336434982,
  },
  {
    time: "2020-11-22 00:00:00",
    open: 30.406972628407885,
    high: 31.09194603110309,
    low: 29.072360125211095,
    close: 30.089117496402665,
  },
  {
    time: "2020-11-23 00:00:00",
    open: 29.968682442274925,
    high: 31.025007723371566,
    low: 29.876416165389923,
    close: 30.855719264341058,
  },
  {
    time: "2020-11-24 00:00:00",
    open: 30.854688875851892,
    high: 35.09825901414952,
    low: 30.82653118720685,
    close: 33.894632163638384,
  },
  {
    time: "2020-11-25 00:00:00",
    open: 33.76054077513295,
    high: 35.34589187701894,
    low: 30.74026889985125,
    close: 31.334834668226122,
  },
  {
    time: "2020-11-26 00:00:00",
    open: 31.30057807297101,
    high: 31.733114005714736,
    low: 26.476094209005275,
    close: 28.186266549298594,
  },
  {
    time: "2020-11-27 00:00:00",
    open: 28.07508979497546,
    high: 28.841032952445534,
    low: 27.256600418638005,
    close: 28.483380855159826,
  },
  {
    time: "2020-11-28 00:00:00",
    open: 28.371298207639473,
    high: 29.64316006799544,
    low: 27.93724413091467,
    close: 29.167108704149314,
  },
  {
    time: "2020-11-29 00:00:00",
    open: 29.05216458535804,
    high: 30.463501193071966,
    low: 28.90228015170402,
    close: 30.080992051486508,
  },
  {
    time: "2020-11-30 00:00:00",
    open: 30.080181028060142,
    high: 31.509934308242226,
    low: 29.790172905691193,
    close: 31.45157661310895,
  },
  {
    time: "2020-12-01 00:00:00",
    open: 31.32593225823199,
    high: 31.872524401179597,
    low: 29.42445752048757,
    close: 30.15897198837527,
  },
  {
    time: "2020-12-02 00:00:00",
    open: 30.06905102313196,
    high: 30.885280304398425,
    low: 29.669463709025298,
    close: 30.262030377714378,
  },
  {
    time: "2020-12-03 00:00:00",
    open: 30.25779574877218,
    high: 30.78647313050486,
    low: 29.89423982868802,
    close: 30.576728763787028,
  },
  {
    time: "2020-12-04 00:00:00",
    open: 30.57593655917272,
    high: 31.06792607799495,
    low: 28.80972635699629,
    close: 28.99230155976969,
  },
  {
    time: "2020-12-05 00:00:00",
    open: 28.988236700263396,
    high: 29.994540256730495,
    low: 28.74792080641295,
    close: 29.59615475229098,
  },
  {
    time: "2020-12-06 00:00:00",
    open: 29.59577086235838,
    high: 30.17938260100791,
    low: 28.773739985370906,
    close: 29.391542727320882,
  },
  {
    time: "2020-12-07 00:00:00",
    open: 29.36171801714812,
    high: 29.9591170957161,
    low: 28.711746522737528,
    close: 29.26760663625014,
  },
  {
    time: "2020-12-08 00:00:00",
    open: 29.264618427068346,
    high: 29.494704077524307,
    low: 27.41827950032277,
    close: 27.603229443055803,
  },
  {
    time: "2020-12-09 00:00:00",
    open: 27.602924999768227,
    high: 28.399469592334302,
    low: 26.895066342783863,
    close: 28.138587157771543,
  },
  {
    time: "2020-12-10 00:00:00",
    open: 28.13569585010586,
    high: 28.258884023362825,
    low: 27.296757498481014,
    close: 27.641112292497617,
  },
  {
    time: "2020-12-11 00:00:00",
    open: 27.638721881093694,
    high: 27.749920322105822,
    low: 26.644319097265175,
    close: 27.31573352445842,
  },
  {
    time: "2020-12-12 00:00:00",
    open: 27.310946692018906,
    high: 28.270884839863374,
    low: 27.30136547940585,
    close: 28.191878590908164,
  },
  {
    time: "2020-12-13 00:00:00",
    open: 28.079291392923587,
    high: 29.279094530180213,
    low: 27.976478905036316,
    close: 29.082239837492626,
  },
  {
    time: "2020-12-14 00:00:00",
    open: 28.968505243253762,
    high: 30.19486210255495,
    low: 28.646430081767434,
    close: 29.94092115984053,
  },
  {
    time: "2020-12-15 00:00:00",
    open: 29.94066680846627,
    high: 30.31721105681973,
    low: 29.331649641558773,
    close: 29.42645792012985,
  },
  {
    time: "2020-12-16 00:00:00",
    open: 29.425647668950642,
    high: 30.627501263478532,
    low: 29.044159902668085,
    close: 30.59861155575121,
  },
  {
    time: "2020-12-17 00:00:00",
    open: 30.477279506916826,
    high: 31.514346472683773,
    low: 29.78127654575739,
    close: 30.239732819153463,
  },
  {
    time: "2020-12-18 00:00:00",
    open: 30.150592855255994,
    high: 31.19910102992203,
    low: 29.68348308942261,
    close: 30.941225280345005,
  },
  {
    time: "2020-12-19 00:00:00",
    open: 30.941170175573056,
    high: 34.16025601698261,
    low: 30.93103416364048,
    close: 33.179825271469625,
  },
  {
    time: "2020-12-20 00:00:00",
    open: 33.17943567938694,
    high: 35.589915194489095,
    low: 32.68051557266754,
    close: 34.13209315853812,
  },
  {
    time: "2020-12-21 00:00:00",
    open: 34.09147935432966,
    high: 35.650272237326895,
    low: 31.594863261119425,
    close: 32.162330289621394,
  },
  {
    time: "2020-12-22 00:00:00",
    open: 32.27602355981042,
    high: 33.83447394989905,
    low: 30.554994720185253,
    close: 33.38896563849402,
  },
  {
    time: "2020-12-23 00:00:00",
    open: 33.38830840765391,
    high: 34.38069086289808,
    low: 29.928959507712296,
    close: 31.183816655577893,
  },
  {
    time: "2020-12-24 00:00:00",
    open: 31.05650082714754,
    high: 32.722110918815815,
    low: 30.423720517560128,
    close: 32.44147581763062,
  },
  {
    time: "2020-12-25 00:00:00",
    open: 32.57486333441287,
    high: 33.45005990815501,
    low: 31.78092763997699,
    close: 33.04369894071175,
  },
  {
    time: "2020-12-26 00:00:00",
    open: 33.17652912652356,
    high: 33.979173223856186,
    low: 32.586747415235536,
    close: 33.46769967388855,
  },
  {
    time: "2020-12-27 00:00:00",
    open: 33.46764487333962,
    high: 34.97793766133985,
    low: 32.04467043874777,
    close: 33.55184696551938,
  },
  {
    time: "2020-12-28 00:00:00",
    open: 33.61835895881326,
    high: 35.98835569774026,
    low: 33.32164860543553,
    close: 35.76223043691781,
  },
  {
    time: "2020-12-29 00:00:00",
    open: 35.7595121594702,
    high: 39.24545754877126,
    low: 35.24153915233478,
    close: 38.98279009662903,
  },
  {
    time: "2020-12-30 00:00:00",
    open: 38.99120352602455,
    high: 39.15628610432614,
    low: 36.89340974737758,
    close: 38.16959522305198,
  },
  {
    time: "2020-12-31 00:00:00",
    open: 38.01865638012485,
    high: 38.17752811038953,
    low: 36.668592722742396,
    close: 37.31031411299637,
  },
  {
    time: "2021-01-01 00:00:00",
    open: 37.46347312713218,
    high: 39.00741722576981,
    low: 36.974616792487254,
    close: 37.98626061156476,
  },
  {
    time: "2021-01-02 00:00:00",
    open: 37.84485171503793,
    high: 38.90540891176018,
    low: 36.87658664592307,
    close: 38.20176863568944,
  },
  {
    time: "2021-01-03 00:00:00",
    open: 38.201760411741546,
    high: 41.73993039831083,
    low: 37.77051986209114,
    close: 41.0887872930966,
  },
  {
    time: "2021-01-04 00:00:00",
    open: 41.25727794020787,
    high: 43.49527815450525,
    low: 38.14065156719106,
    close: 41.07184124279957,
  },
  {
    time: "2021-01-05 00:00:00",
    open: 41.08003790076009,
    high: 41.838051466740716,
    low: 38.45187262258481,
    close: 41.830167117954055,
  },
  {
    time: "2021-01-06 00:00:00",
    open: 41.847200807298265,
    high: 42.27755360918829,
    low: 40.56502997169377,
    close: 42.257643554227215,
  },
  {
    time: "2021-01-07 00:00:00",
    open: 42.099824433961146,
    high: 50,
    low: 41.476618106620776,
    close: 43.44268582864339,
  },
  {
    time: "2021-01-08 00:00:00",
    open: 43.44018444355268,
    high: 43.73631174152745,
    low: 40.51782605191272,
    close: 42.50944727594629,
  },
  {
    time: "2021-01-09 00:00:00",
    open: 42.509504941060676,
    high: 44.239310897979884,
    low: 41.568865802600044,
    close: 43.91451055727036,
  },
  {
    time: "2021-01-10 00:00:00",
    open: 44.095012832457975,
    high: 45.191213536809585,
    low: 40.229505023885544,
    close: 42.509831947846614,
  },
  {
    time: "2021-01-11 00:00:00",
    open: 42.51265693080532,
    high: 42.51265693080532,
    low: 35.039161357951194,
    close: 38.29154444187717,
  },
  {
    time: "2021-01-12 00:00:00",
    open: 38.292286449287936,
    high: 39.9468708925986,
    low: 37.08965059531565,
    close: 38.22399701746362,
  },
  {
    time: "2021-01-13 00:00:00",
    open: 38.075529176256644,
    high: 40.528207303196666,
    low: 37.02517597479609,
    close: 40.164925795307816,
  },
  {
    time: "2021-01-14 00:00:00",
    open: 40.1651448805348,
    high: 41.89541993641715,
    low: 39.615530351865964,
    close: 41.73352205880639,
  },
  {
    time: "2021-01-15 00:00:00",
    open: 41.73317680557028,
    high: 42.47429154422927,
    low: 38.76193813796394,
    close: 41.0822781637045,
  },
  {
    time: "2021-01-16 00:00:00",
    open: 41.082298621215045,
    high: 44.009720890682665,
    low: 40.68649188304459,
    close: 43.30947655642366,
  },
  {
    time: "2021-01-17 00:00:00",
    open: 43.13655720398891,
    high: 46.69052167292028,
    low: 40.94618440335556,
    close: 45.866096455364605,
  },
  {
    time: "2021-01-18 00:00:00",
    open: 45.682869198749735,
    high: 46.84936390211346,
    low: 44.05756420812292,
    close: 45.41436657319372,
  },
  {
    time: "2021-01-19 00:00:00",
    open: 45.23381215918631,
    high: 47.20283405901334,
    low: 41.76065401330042,
    close: 42.77277461678112,
  },
  {
    time: "2021-01-20 00:00:00",
    open: 42.60275021118901,
    high: 42.82137617978503,
    low: 40.25930119463362,
    close: 42.388370633376695,
  },
  {
    time: "2021-01-21 00:00:00",
    open: 42.558327346724795,
    high: 42.62372887460201,
    low: 38.19123268954054,
    close: 38.5381708619741,
  },
  {
    time: "2021-01-22 00:00:00",
    open: 38.53814343899973,
    high: 41.4005530818646,
    low: 36.79096341194474,
    close: 40.85459554775484,
  },
  {
    time: "2021-01-23 00:00:00",
    open: 40.85767661952685,
    high: 41.7933191550764,
    low: 39.47673882621212,
    close: 40.947537815398846,
  },
  {
    time: "2021-01-24 00:00:00",
    open: 40.81565207066416,
    high: 42.31829092131354,
    low: 40.33780092024282,
    close: 41.981622942048034,
  },
  {
    time: "2021-01-25 00:00:00",
    open: 41.81503404631976,
    high: 43.38548403253517,
    low: 40.4308810245428,
    close: 41.692610137252636,
  },
  {
    time: "2021-01-26 00:00:00",
    open: 41.54587887143138,
    high: 42.52488272758957,
    low: 39.76733898596977,
    close: 41.74775963711625,
  },
  {
    time: "2021-01-27 00:00:00",
    open: 41.75493084038496,
    high: 42.11452252399203,
    low: 39.175241047095945,
    close: 41.1851331698801,
  },
  {
    time: "2021-01-28 00:00:00",
    open: 41.143523065583544,
    high: 46.957727686193785,
    low: 40.41101365102655,
    close: 42.47255234734727,
  },
  {
    time: "2021-01-29 00:00:00",
    open: 42.465687050445645,
    high: 44.24125271366279,
    low: 41.81403148920506,
    close: 42.9643793169885,
  },
  {
    time: "2021-01-30 00:00:00",
    open: 42.79278015718174,
    high: 45.171177584362134,
    low: 42.581846975366155,
    close: 44.74860988687412,
  },
  {
    time: "2021-01-31 00:00:00",
    open: 44.74826582720011,
    high: 45.763799156051064,
    low: 43.15500054501229,
    close: 44.19882408426207,
  },
  {
    time: "2021-02-01 00:00:00",
    open: 44.1945831430025,
    high: 52.36632832378348,
    low: 43.273948167149584,
    close: 51.59540477772354,
  },
  {
    time: "2021-02-02 00:00:00",
    open: 51.38954786645357,
    high: 53.19070490225336,
    low: 49.00031136556643,
    close: 50.872144832090726,
  },
  {
    time: "2021-02-03 00:00:00",
    open: 50.86689888106737,
    high: 52.715863659612666,
    low: 49.81219255213897,
    close: 52.204952619144585,
  },
  {
    time: "2021-02-04 00:00:00",
    open: 51.99636190209474,
    high: 57.05761512163082,
    low: 51.3985887249949,
    close: 56.06712306008525,
  },
  {
    time: "2021-02-05 00:00:00",
    open: 55.99353605829737,
    high: 68.72588127194008,
    low: 55.334617128809924,
    close: 67.71098118341605,
  },
  {
    time: "2021-02-06 00:00:00",
    open: 67.981725290001,
    high: 75.72393982565349,
    low: 62.200779985385026,
    close: 72.8192097080042,
  },
  {
    time: "2021-02-07 00:00:00",
    open: 72.53198786403583,
    high: 74.65110927987858,
    low: 64.05628668804475,
    close: 68.76881583825914,
  },
  {
    time: "2021-02-08 00:00:00",
    open: 68.49513494687433,
    high: 79.76404271697102,
    low: 67.76025110716324,
    close: 79.42551847863602,
  },
];
