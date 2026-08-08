/** Generated from pediatric dose strings — run scripts/generate-drug-calculation-params.mjs */
export type DrugDoseScheme = {
  maxDailyDoseMgPerKgPerDay: number;
  maxDosesPerDay: number;
  doseIntervalHours: number;
};

export type DrugCalculationParams = {
  schemes: DrugDoseScheme[];
};

export const DRUG_CALCULATION_PARAMS: Record<string, DrugCalculationParams> = {
  "aci-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 80,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 30,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 60,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 15,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 10,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "asa-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 50,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "fus-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 40,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "ami-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 10,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 30,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 15,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "amd-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 10,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "aml-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.06,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "amo-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 20,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 40,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "amo-002": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 20,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 40,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "amp-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 300,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 400,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      }
    ]
  },
  "amp-002": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 150,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 300,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      }
    ]
  },
  "amf-003": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 5,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "amf-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.5,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "amf-002": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 5,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "ate-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 1,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 2,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.5,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 1,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 2,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "atr-002": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.4,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.5,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "azi-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 10,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 5,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 12,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "azt-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 120,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 120,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 150,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "bis-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.1,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.2,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "bum-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.06,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.2,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.03,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.1,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      }
    ]
  },
  "cap-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.9,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 1.5,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.3,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.5,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.03,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.15,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "car-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 20,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "cvd-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.16,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.3,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.7,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.2,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 1,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      }
    ]
  },
  "cas-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 2,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "cef-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 25,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 50,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 100,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 30,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "cef-009": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 100,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 100,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "cef-002": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 25,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 100,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 25,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 100,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "cef-008": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 100,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 150,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 200,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      }
    ]
  },
  "cef-006": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 100,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 150,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 100,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 150,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 200,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 300,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      }
    ]
  },
  "cef-004": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 80,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 160,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 80,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 160,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "cef-007": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 150,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 200,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 100,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 150,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "cef-005": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 50,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 75,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 100,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "cef-003": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 75,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 150,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 240,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "cip-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 20,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 30,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 30,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "cst-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.1,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.15,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.2,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "cla-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 15,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 30,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      }
    ]
  },
  "cli-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 30,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 30,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "clz-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.03,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "cpg-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 1,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "dap-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 4,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 6,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "dxt-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.3,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "dic-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 2,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "dif-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 1,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 3,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 5,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 3,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 5,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "dlt-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.25,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.35,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.4,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.9,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.3,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.9,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "dip-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 40,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 80,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      }
    ]
  },
  "dom-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.75,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "dox-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 2,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 4,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      }
    ]
  },
  "efe-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.1,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.2,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "enp-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.08,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.6,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "eri-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 30,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 50,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      }
    ]
  },
  "esp-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 1,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 1,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 3.3,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 3.3,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "est-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 15,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 20,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "fny-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 15,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 20,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 5,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 8,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      }
    ]
  },
  "phb-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 20,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 3,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 5,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 3,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 5,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "vit-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 1,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "flc-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 1,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 5,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "flu-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 3,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 6,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 12,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "fsc-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 180,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 180,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 90,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 120,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 120,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "fos-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 200,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 400,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 200,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 400,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "fur-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 2,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 4,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 2,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 4,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 4,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      }
    ]
  },
  "gbp-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 15,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "gnc-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 5,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "gen-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 5,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 7.5,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 10,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 3,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "hal-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.025,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.05,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.025,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.15,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "hdr-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.75,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 1,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 5,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 7.5,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "hct-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 2,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 4,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      }
    ]
  },
  "hdc-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 5,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "hxz-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 2,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "fer-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 3,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "hio-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.9,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 1.5,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 1.8,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "ibu-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 20,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6,
        "indication": "VO/IV fiebre-dolor (5 mg/kg)"
      },
      {
        "maxDailyDoseMgPerKgPerDay": 30,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8,
        "indication": "VO/IV fiebre-dolor (10 mg/kg; máx. 30 mg/kg/día)"
      }
    ]
  },
  "imp-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 60,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 100,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 60,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 100,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 90,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      }
    ]
  },
  "ivb-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.1,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      }
    ]
  },
  "ket-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 1,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 2,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 5,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.5,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 3,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "lvt-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 10,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 20,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 40,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 60,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      }
    ]
  },
  "lev-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 20,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 10,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 15,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 20,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "lis-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.07,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.6,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "lop-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.24,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "lor-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.3,
        "maxDosesPerDay": 6,
        "doseIntervalHours": 4
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.2,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.15,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "los-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.75,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "mer-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 120,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 60,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "mep-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 15,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 30,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "mtp-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.4,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.8,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      }
    ]
  },
  "mop-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.1,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "met-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 30,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 35,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "mic-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 4,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "min-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 4,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 4,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      }
    ]
  },
  "mox-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 10,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "nap-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 10,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "nif-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.5,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 1,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.25,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.5,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 3,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "nit-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 5,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 7,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 2.5,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "olm-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.3,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 1,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "ome-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.5,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 2,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      }
    ]
  },
  "ond-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.45,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "ose-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 3,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 6,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 2,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 3,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      }
    ]
  },
  "oxa-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 100,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 200,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 100,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 200,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 50,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 100,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      }
    ]
  },
  "pan-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.5,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 1,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "pct-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 60,
        "maxDosesPerDay": 6,
        "doseIntervalHours": 4,
        "indication": "VO 10 mg/kg cada 4 h"
      },
      {
        "maxDailyDoseMgPerKgPerDay": 60,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6,
        "indication": "VO/IV 15 mg/kg cada 6 h (~60 mg/kg/día)"
      }
    ]
  },
  "pip-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 300,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "pol-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 10,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 20,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 10,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 20,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "prd-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 3,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "ppf-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 8,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 10,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 2,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "prp-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.75,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 1,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 5,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 8,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 16,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 3,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 6,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "ram-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.05,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.1,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "ran-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 1.5,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 1.5,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 2,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 4,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 2,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 4,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "rif-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 10,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 20,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "sav-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 3.2,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 4.6,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 6.2,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      }
    ]
  },
  "sil-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 2,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 4,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 1.5,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 3,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 4,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 1,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      }
    ]
  },
  "suc-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 1,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 1.5,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 3,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "sul-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 100,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "tei-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 16,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 8,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 20,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 10,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 15,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 20,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "tel-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 1,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 2,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "tic-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 200,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 400,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 200,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 400,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "tob-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 5,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 7,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 4,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 5,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "tor-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.2,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.4,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.1,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.2,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "trm-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 3,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 6,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "tri-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 8,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 12,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      }
    ]
  },
  "val-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 20,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 15,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 50,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 90,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 10,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 30,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      }
    ]
  },
  "vls-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 1.3,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      }
    ]
  },
  "van-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 60,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 40,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 45,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "vrp-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 2,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 8,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "war-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.1,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.2,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "zid-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 4,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 6,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 8,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 3,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 6,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 8,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 24,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      }
    ]
  },
  "teo-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 5,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      }
    ]
  },
  "cef-010": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 18,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 24,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 36,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "cef-011": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 150,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 187.5,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "cef-012": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 90,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 135,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "caf-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 10,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 2.5,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "clp-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 3,
        "maxDosesPerDay": 6,
        "doseIntervalHours": 4
      },
      {
        "maxDailyDoseMgPerKgPerDay": 6,
        "maxDosesPerDay": 6,
        "doseIntervalHours": 4
      },
      {
        "maxDailyDoseMgPerKgPerDay": 2,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 4,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      }
    ]
  },
  "col-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 5,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 5,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      }
    ]
  },
  "dia-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.1,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.2,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.3,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 1.8,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "dig-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.01,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.02,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.005,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "bup-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.5,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "eno-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 1,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 1.5,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 2,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 3,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      }
    ]
  },
  "ert-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 30,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      }
    ]
  },
  "lin-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 30,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 20,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      }
    ]
  },
  "ktr-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 2,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 1.5,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 4,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 3,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "lid-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 1,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 3,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 5,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "man-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 250,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 500,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 1000,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "mor-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.3,
        "maxDosesPerDay": 6,
        "doseIntervalHours": 4
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.6,
        "maxDosesPerDay": 6,
        "doseIntervalHours": 4
      }
    ]
  },
  "nal-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.01,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "pnc-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.05,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.1,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.2,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "roc-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.45,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.6,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "vec-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.1,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.05,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "sal-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 1.5,
        "maxDosesPerDay": 12,
        "doseIntervalHours": 2
      },
      {
        "maxDailyDoseMgPerKgPerDay": 3,
        "maxDosesPerDay": 12,
        "doseIntervalHours": 2
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.5,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 1,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      }
    ]
  },
  "pos-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 12,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 18,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "vor-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 18,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      },
      {
        "maxDailyDoseMgPerKgPerDay": 16,
        "maxDosesPerDay": 2,
        "doseIntervalHours": 12
      }
    ]
  },
  "sug-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 2,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 4,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 16,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "srf-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 100,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 200,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "mag-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 25,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 75,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "clo-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.002,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.006,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.0015,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.003,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.025,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "azt-002": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 90,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 120,
        "maxDosesPerDay": 4,
        "doseIntervalHours": 6
      },
      {
        "maxDailyDoseMgPerKgPerDay": 90,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 120,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      },
      {
        "maxDailyDoseMgPerKgPerDay": 150,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "ade-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.05,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.1,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.2,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.5,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "atr-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.02,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "flm-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.01,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "mid-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.05,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.1,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.2,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "ltx-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.01,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.015,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "esm-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.5,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.6,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "lab-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.2,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.5,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 1,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 2,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 3,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 4,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "mil-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.05,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "glc-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.02,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.03,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.1,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  },
  "ipr-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.075,
        "maxDosesPerDay": 3,
        "doseIntervalHours": 8
      }
    ]
  },
  "fnt-001": {
    "schemes": [
      {
        "maxDailyDoseMgPerKgPerDay": 0.001,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.002,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.005,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      },
      {
        "maxDailyDoseMgPerKgPerDay": 0.01,
        "maxDosesPerDay": 1,
        "doseIntervalHours": 24
      }
    ]
  }
};

export const DRUG_CALCULATION_PARAM_IDS = Object.keys(DRUG_CALCULATION_PARAMS);
