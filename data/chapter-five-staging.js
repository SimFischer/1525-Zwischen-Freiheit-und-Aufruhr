// Generated from the approved manifest; original registrations and alpha bounds.
export const chapterFiveStaging = {
 "scenes": {
  "peasant_camp_morning": {
   "id": "ch5_peasant_camp_morning",
   "background": "assets/chapter5/backgrounds/ch5_bg_peasant_camp_morning.png",
   "branch": "A",
   "purpose": "Konrad, Matthes und Bauernmitglied organisieren Versorgung",
   "figures": [
    {
     "id": "konrad",
     "x": 29,
     "bodyHeight": 48,
     "footline": 71,
     "facing": "right",
     "mirror": true
    },
    {
     "id": "matthes",
     "x": 52,
     "bodyHeight": 48,
     "footline": 71,
     "facing": "left",
     "mirror": false
    },
    {
     "id": "band1",
     "x": 75,
     "bodyHeight": 48,
     "footline": 71,
     "facing": "left",
     "mirror": true
    }
   ],
   "overlays": [
    "camp_supply",
    "armed_tension"
   ],
   "overlayRegistration": {
    "camp_supply": {
     "scale": 0.401569,
     "left": 3.6863,
     "top": 26.0131,
     "units": "percent of entire scene; transform-origin top-left",
     "visibleAlphaBounds": [
      8,
      319,
      365,
      497
     ],
     "required": true
    },
    "armed_tension": {
     "scale": 0.510111,
     "left": 1.8127,
     "top": 19.9594,
     "units": "percent of entire scene; transform-origin top-left",
     "visibleAlphaBounds": [
      47,
      106,
      362,
      377
     ],
     "required": true
    }
   },
   "props": [
    "food_supplies",
    "tools_weapons_bundle"
   ],
   "hotspot": {
    "x": 52,
    "y": 16,
    "kind": "object",
    "label": "Vorräte ansehen"
   },
   "footline": 71,
   "bodyHeight": 48,
   "horizon": 27,
   "vanishingPoint": {
    "x": 53,
    "y": 27
   },
   "depthZones": {
    "front": {
     "footline": 71,
     "bodyHeight": 48
    },
    "middle": {
     "footline": 58,
     "bodyHeight": 27
    },
    "back": {
     "footline": 48,
     "bodyHeight": 16
    }
   },
   "maxForeground": 3,
   "dialogSafeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26
   }
  },
  "road_with_peasant_band": {
   "id": "ch5_road_with_peasant_band",
   "background": "assets/chapter5/backgrounds/ch5_bg_road_with_peasant_band.png",
   "branch": "A",
   "purpose": "Abordnung oder Aufbruch auf der Straße",
   "figures": [
    {
     "id": "konrad",
     "x": 30,
     "bodyHeight": 42,
     "footline": 71,
     "facing": "right",
     "mirror": true
    },
    {
     "id": "matthes",
     "x": 65,
     "bodyHeight": 42,
     "footline": 71,
     "facing": "left",
     "mirror": false
    }
   ],
   "overlays": [
    "camp_departure",
    "group_retreat",
    "distant_troops"
   ],
   "overlayRegistration": {
    "camp_departure": {
     "scale": 0.601043,
     "left": 34.3391,
     "top": 16.2609,
     "units": "percent of entire scene; transform-origin top-left",
     "visibleAlphaBounds": [
      672,
      265,
      952,
      380
     ],
     "required": true
    },
    "group_retreat": {
     "scale": 0.379929,
     "left": 58.4717,
     "top": 23.2261,
     "units": "percent of entire scene; transform-origin top-left",
     "visibleAlphaBounds": [
      485,
      238,
      945,
      521
     ],
     "required": true
    },
    "distant_troops": {
     "scale": 0.363243,
     "left": 50.5752,
     "top": 20.3311,
     "units": "percent of entire scene; transform-origin top-left",
     "visibleAlphaBounds": [
      701,
      289,
      958,
      437
     ],
     "required": true
    }
   },
   "props": [],
   "hotspot": {
    "x": 51,
    "y": 23,
    "kind": "path",
    "label": "Der Straße folgen"
   },
   "footline": 71,
   "bodyHeight": 42,
   "horizon": 34,
   "vanishingPoint": {
    "x": 53,
    "y": 34
   },
   "depthZones": {
    "front": {
     "footline": 71,
     "bodyHeight": 42
    },
    "middle": {
     "footline": 58,
     "bodyHeight": 27
    },
    "back": {
     "footline": 48,
     "bodyHeight": 16
    }
   },
   "maxForeground": 2,
   "dialogSafeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26
   }
  },
  "road_stopped_dues_cart": {
   "id": "ch5_road_stopped_dues_cart",
   "background": "assets/chapter5/backgrounds/ch5_bg_road_stopped_dues_cart.png",
   "branch": "A",
   "purpose": "Der Abgabenwagen wird aufgehalten",
   "figures": [
    {
     "id": "peter",
     "x": 25,
     "bodyHeight": 36,
     "footline": 71,
     "facing": "right",
     "mirror": false
    },
    {
     "id": "konrad",
     "x": 48,
     "bodyHeight": 36,
     "footline": 71,
     "facing": "left",
     "mirror": false
    },
    {
     "id": "matthes",
     "x": 68,
     "bodyHeight": 36,
     "footline": 71,
     "facing": "left",
     "mirror": false
    }
   ],
   "overlays": [],
   "overlayRegistration": {},
   "props": [],
   "hotspot": {
    "x": 86,
    "y": 47,
    "kind": "object",
    "label": "Abgaben prüfen"
   },
   "footline": 71,
   "bodyHeight": 36,
   "horizon": 38,
   "vanishingPoint": {
    "x": 53,
    "y": 38
   },
   "depthZones": {
    "front": {
     "footline": 71,
     "bodyHeight": 36
    },
    "middle": {
     "footline": 58,
     "bodyHeight": 27
    },
    "back": {
     "footline": 48,
     "bodyHeight": 16
    }
   },
   "maxForeground": 3,
   "dialogSafeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26
   }
  },
  "camp_prisoner": {
   "id": "ch5_camp_prisoner",
   "background": "assets/chapter5/backgrounds/ch5_bg_camp_prisoner.png",
   "branch": "A/E",
   "purpose": "Gefangenenentscheidung im Bauernlager",
   "figures": [
    {
     "id": "konrad",
     "x": 15,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "right",
     "mirror": true
    },
    {
     "id": "envoy",
     "x": 38,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": false
    },
    {
     "id": "anna",
     "x": 62,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": false
    },
    {
     "id": "jakob",
     "x": 85,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": false
    }
   ],
   "overlays": [],
   "overlayRegistration": {},
   "props": [],
   "hotspot": {
    "x": 51,
    "y": 23,
    "kind": "action",
    "label": "Zum Gefangenen sprechen"
   },
   "footline": 71,
   "bodyHeight": 41,
   "horizon": 34,
   "vanishingPoint": {
    "x": 53,
    "y": 34
   },
   "depthZones": {
    "front": {
     "footline": 71,
     "bodyHeight": 41
    },
    "middle": {
     "footline": 58,
     "bodyHeight": 27
    },
    "back": {
     "footline": 48,
     "bodyHeight": 16
    }
   },
   "maxForeground": 4,
   "dialogSafeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26
   }
  },
  "negotiation_chamber": {
   "id": "ch5_negotiation_chamber",
   "background": "assets/chapter5/backgrounds/ch5_bg_negotiation_chamber.png",
   "branch": "B",
   "purpose": "Verhandlung mit ungleichen Handlungsmöglichkeiten",
   "figures": [
    {
     "id": "peter",
     "x": 22,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "right",
     "mirror": false
    },
    {
     "id": "anna",
     "x": 39,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": false
    },
    {
     "id": "overseer",
     "x": 77,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": false
    }
   ],
   "overlays": [
    "delegation_inside",
    "negotiation_broken"
   ],
   "overlayRegistration": {
    "delegation_inside": {
     "scale": 0.192948,
     "left": 44.9852,
     "top": 29.9659,
     "units": "percent of entire scene; transform-origin top-left",
     "visibleAlphaBounds": [
      160,
      312,
      903,
      479
     ],
     "required": true
    },
    "negotiation_broken": {
     "scale": 0.30797,
     "left": 39.5865,
     "top": 24.2356,
     "units": "percent of entire scene; transform-origin top-left",
     "visibleAlphaBounds": [
      313,
      287,
      712,
      443
     ],
     "required": true
    }
   },
   "props": [
    "negotiation_terms",
    "village_petition",
    "seal_and_wax"
   ],
   "hotspot": {
    "x": 58,
    "y": 42,
    "kind": "object",
    "label": "Bedingungen"
   },
   "footline": 71,
   "bodyHeight": 41,
   "horizon": 34,
   "vanishingPoint": {
    "x": 53,
    "y": 34
   },
   "depthZones": {
    "front": {
     "footline": 71,
     "bodyHeight": 41
    },
    "middle": {
     "footline": 58,
     "bodyHeight": 27
    },
    "back": {
     "footline": 48,
     "bodyHeight": 16
    }
   },
   "maxForeground": 3,
   "dialogSafeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26
   }
  },
  "theological_council_evening": {
   "id": "ch5_theological_council_evening",
   "background": "assets/chapter5/backgrounds/ch5_bg_theological_council_evening.png",
   "branch": "C",
   "purpose": "Unter Zeitdruck theologisch beraten",
   "figures": [
    {
     "id": "jakob",
     "x": 25,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "right",
     "mirror": true
    },
    {
     "id": "anna",
     "x": 48,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": false
    },
    {
     "id": "preacher",
     "x": 74,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": true
    }
   ],
   "overlays": [
    "wounded_return"
   ],
   "overlayRegistration": {
    "wounded_return": {
     "scale": 0.554513,
     "left": 1.796,
     "top": 24.3971,
     "units": "percent of entire scene; transform-origin top-left",
     "visibleAlphaBounds": [
      49,
      133,
      254,
      410
     ],
     "required": true
    }
   },
   "props": [
    "bible_council",
    "luther_text_stack",
    "emergency_report"
   ],
   "hotspot": {
    "x": 51,
    "y": 24,
    "kind": "object",
    "label": "Berichte und Schrift prüfen"
   },
   "footline": 71,
   "bodyHeight": 41,
   "horizon": 34,
   "vanishingPoint": {
    "x": 53,
    "y": 34
   },
   "depthZones": {
    "front": {
     "footline": 71,
     "bodyHeight": 41
    },
    "middle": {
     "footline": 58,
     "bodyHeight": 27
    },
    "back": {
     "footline": 48,
     "bodyHeight": 16
    }
   },
   "maxForeground": 3,
   "dialogSafeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26
   }
  },
  "churchyard_dispute": {
   "id": "ch5_churchyard_dispute",
   "background": "assets/chapter5/backgrounds/ch5_bg_churchyard_dispute.png",
   "branch": "D",
   "purpose": "Zwei ernsthafte religiöse Deutungen im selben Kirchhof",
   "figures": [
    {
     "id": "jakob",
     "x": 38,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "right",
     "mirror": true
    },
    {
     "id": "preacher",
     "x": 62,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": true
    }
   ],
   "overlays": [
    "order_group",
    "justice_group"
   ],
   "overlayRegistration": {
    "order_group": {
     "scale": 0.406588,
     "left": 8.461,
     "top": 27.2824,
     "units": "percent of entire scene; transform-origin top-left",
     "visibleAlphaBounds": [
      0,
      108,
      279,
      448
     ],
     "required": true
    },
    "justice_group": {
     "scale": 0.445935,
     "left": 50.3105,
     "top": 21.0387,
     "units": "percent of entire scene; transform-origin top-left",
     "visibleAlphaBounds": [
      674,
      206,
      1011,
      516
     ],
     "required": true
    }
   },
   "props": [
    "competing_flyers",
    "public_bible"
   ],
   "hotspot": {
    "x": 51,
    "y": 25,
    "kind": "object",
    "label": "Die Deutungen vergleichen"
   },
   "footline": 71,
   "bodyHeight": 41,
   "horizon": 34,
   "vanishingPoint": {
    "x": 53,
    "y": 34
   },
   "depthZones": {
    "front": {
     "footline": 71,
     "bodyHeight": 41
    },
    "middle": {
     "footline": 58,
     "bodyHeight": 27
    },
    "back": {
     "footline": 48,
     "bodyHeight": 16
    }
   },
   "maxForeground": 2,
   "dialogSafeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26
   }
  },
  "village_prisoner_courtyard": {
   "id": "ch5_village_prisoner_courtyard",
   "background": "assets/chapter5/backgrounds/ch5_bg_village_prisoner_courtyard.png",
   "branch": "B/C/D/E",
   "purpose": "Gemeinsame Gefangenenentscheidung im Hof",
   "figures": [
    {
     "id": "konrad",
     "x": 15,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "right",
     "mirror": true
    },
    {
     "id": "envoy",
     "x": 38,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": false
    },
    {
     "id": "anna",
     "x": 62,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": false
    },
    {
     "id": "jakob",
     "x": 85,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": false
    }
   ],
   "overlays": [],
   "overlayRegistration": {},
   "props": [],
   "hotspot": {
    "x": 51,
    "y": 23,
    "kind": "action",
    "label": "Den Bericht anhören"
   },
   "footline": 71,
   "bodyHeight": 41,
   "horizon": 34,
   "vanishingPoint": {
    "x": 53,
    "y": 34
   },
   "depthZones": {
    "front": {
     "footline": 71,
     "bodyHeight": 41
    },
    "middle": {
     "footline": 58,
     "bodyHeight": 27
    },
    "back": {
     "footline": 48,
     "bodyHeight": 16
    }
   },
   "maxForeground": 4,
   "dialogSafeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26
   }
  },
  "road_troops_approaching": {
   "id": "ch5_road_troops_approaching",
   "background": "assets/chapter5/backgrounds/ch5_bg_road_troops_approaching.png",
   "branch": "F",
   "purpose": "Matthes bringt Nachricht angesichts nähernder Truppen",
   "figures": [
    {
     "id": "matthes",
     "x": 29,
     "bodyHeight": 42,
     "footline": 71,
     "facing": "right",
     "mirror": true
    },
    {
     "id": "peter",
     "x": 65,
     "bodyHeight": 42,
     "footline": 71,
     "facing": "left",
     "mirror": true
    }
   ],
   "overlays": [
    "people_evacuating",
    "group_retreat"
   ],
   "overlayRegistration": {
    "people_evacuating": {
     "scale": 0.527634,
     "left": 1.9781,
     "top": 20.916,
     "units": "percent of entire scene; transform-origin top-left",
     "visibleAlphaBounds": [
      35,
      205,
      354,
      467
     ],
     "required": true
    },
    "group_retreat": {
     "scale": 0.379929,
     "left": 58.4717,
     "top": 23.2261,
     "units": "percent of entire scene; transform-origin top-left",
     "visibleAlphaBounds": [
      485,
      238,
      945,
      521
     ],
     "required": true
    }
   },
   "props": [
    "emergency_report"
   ],
   "hotspot": {
    "x": 51,
    "y": 23,
    "kind": "path",
    "label": "Den Rückweg prüfen"
   },
   "footline": 71,
   "bodyHeight": 42,
   "horizon": 34,
   "vanishingPoint": {
    "x": 53,
    "y": 34
   },
   "depthZones": {
    "front": {
     "footline": 71,
     "bodyHeight": 42
    },
    "middle": {
     "footline": 58,
     "bodyHeight": 27
    },
    "back": {
     "footline": 48,
     "bodyHeight": 16
    }
   },
   "maxForeground": 2,
   "dialogSafeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26
   }
  },
  "village_after_crisis": {
   "id": "ch5_village_after_crisis",
   "background": "assets/chapter5/backgrounds/ch5_bg_village_after_crisis.png",
   "branch": "G",
   "purpose": "Das vertraute Dorf trägt die Folgen",
   "figures": [
    {
     "id": "anna",
     "x": 28,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "right",
     "mirror": true
    },
    {
     "id": "peter",
     "x": 51,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": true
    },
    {
     "id": "jakob",
     "x": 74,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": false
    }
   ],
   "overlays": [
    "after_defeat",
    "after_negotiation_collapse",
    "after_protection",
    "after_fragmentation",
    "after_deescalation"
   ],
   "overlayRegistration": {
    "after_defeat": {
     "scale": 1,
     "left": 0,
     "top": -10,
     "units": "percent of entire scene; transform-origin top-left",
     "visibleAlphaBounds": [
      37,
      330,
      964,
      501
     ],
     "required": true
    },
    "after_negotiation_collapse": {
     "scale": 1,
     "left": 0,
     "top": -3,
     "units": "percent of entire scene; transform-origin top-left",
     "visibleAlphaBounds": [
      30,
      199,
      1009,
      493
     ],
     "required": true
    },
    "after_protection": {
     "scale": 1,
     "left": 0,
     "top": 0,
     "units": "percent of entire scene; transform-origin top-left",
     "visibleAlphaBounds": [
      16,
      239,
      259,
      439
     ],
     "required": true
    },
    "after_fragmentation": {
     "scale": 1,
     "left": 0,
     "top": -6,
     "units": "percent of entire scene; transform-origin top-left",
     "visibleAlphaBounds": [
      46,
      288,
      1018,
      438
     ],
     "required": true
    },
    "after_deescalation": {
     "scale": 1,
     "left": 0,
     "top": -9,
     "units": "percent of entire scene; transform-origin top-left",
     "visibleAlphaBounds": [
      19,
      401,
      1024,
      541
     ],
     "required": true
    }
   },
   "props": [],
   "hotspot": {
    "x": 51,
    "y": 24,
    "kind": "action",
    "label": "Was bleibt zu tun?"
   },
   "footline": 71,
   "bodyHeight": 41,
   "horizon": 33,
   "vanishingPoint": {
    "x": 53,
    "y": 33
   },
   "depthZones": {
    "front": {
     "footline": 71,
     "bodyHeight": 41
    },
    "middle": {
     "footline": 58,
     "bodyHeight": 27
    },
    "back": {
     "footline": 48,
     "bodyHeight": 16
    }
   },
   "maxForeground": 3,
   "dialogSafeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26
   }
  }
 },
 "canon": {
  "peter": {
   "asset": "assets/chapter2/characters/ch2_char_peter_neutral.png",
   "width": 284,
   "height": 783,
   "bounds": [
    0,
    0,
    284,
    783
   ],
   "facing": "right",
   "sha256": "ae216d280f7a23eaf3c41d802c43a288bed4c2729347047a735ac2cbe7ce1d95"
  },
  "anna": {
   "asset": "assets/chapter3/characters/ch3_char_anna_repaired.png",
   "width": 789,
   "height": 1994,
   "bounds": [
    1,
    0,
    789,
    1994
   ],
   "facing": "left",
   "sha256": "ee4b759dd9763157bc4f1ab4613400dffc06f582f1f682ce3a44d5b158da24d4"
  },
  "jakob": {
   "asset": "assets/chapter3/characters/ch3_char_jakob_repaired.png",
   "width": 752,
   "height": 2092,
   "bounds": [
    0,
    0,
    752,
    2074
   ],
   "facing": "left",
   "sha256": "dfa512a4975dc01e172d84c8b242f969dedd467e159b87f4613ffa1cd10e0d46"
  },
  "konrad": {
   "asset": "assets/chapter3/characters/ch3_char_konrad_repaired.png",
   "width": 820,
   "height": 1918,
   "bounds": [
    0,
    0,
    803,
    1892
   ],
   "facing": "left",
   "sha256": "9c5f0993802e97234ee55a858cfa90ee2064b598ab1de56a84901767938bef55"
  },
  "matthes": {
   "asset": "assets/chapter3/characters/ch3_char_matthes_talking.png",
   "width": 512,
   "height": 896,
   "bounds": [
    94,
    59,
    452,
    792
   ],
   "facing": "left",
   "sha256": "276340c554f59b6d62d28959dc837a1c6d06dde38d66f789b4413cfdc2fd0604"
  },
  "preacher": {
   "asset": "assets/chapter4/characters/ch4_char_local_preacher_talking.png",
   "width": 512,
   "height": 896,
   "bounds": [
    43,
    15,
    469,
    881
   ],
   "facing": "right",
   "sha256": "8fc1510a141530e8adfb792c8a745f7608125a11a9f0e37725e75af069be4d91"
  },
  "envoy": {
   "asset": "assets/chapter4/characters/ch4_char_authority_envoy_talking.png",
   "width": 512,
   "height": 896,
   "bounds": [
    53,
    15,
    458,
    881
   ],
   "facing": "left",
   "sha256": "8aa1327cbe3e3ec425ef970aa5948cd48792ca6d14c316261be196989db6d0aa"
  },
  "band1": {
   "asset": "assets/chapter4/characters/ch4_char_peasant_band_member_1.png",
   "width": 512,
   "height": 896,
   "bounds": [
    27,
    15,
    485,
    881
   ],
   "facing": "right",
   "sha256": "c9c83364bff43919a42be96c34aaf24ef58dd0c80da54711dc51293460aa1353"
  },
  "band2": {
   "asset": "assets/chapter4/characters/ch4_char_peasant_band_member_2.png",
   "width": 512,
   "height": 896,
   "bounds": [
    73,
    15,
    439,
    881
   ],
   "facing": "left",
   "sha256": "17a563f604d4e31c8c8b5123303d573653bf348460302516db87b689b1221d56"
  },
  "overseer": {
   "asset": "assets/chapter2/characters/ch2_char_overseer_neutral.png",
   "width": 311,
   "height": 864,
   "bounds": [
    0,
    0,
    311,
    864
   ],
   "facing": "left",
   "sha256": "c3e7e03d5f2085c4d2f2b94e43260157aa1cad72aa201f7155c4f15bfbdf735a"
  }
 },
 "assets": {
  "bg_peasant_camp_morning": {
   "filename": "ch5_bg_peasant_camp_morning.png",
   "path": "assets/chapter5/backgrounds/ch5_bg_peasant_camp_morning.png",
   "type": "backgrounds",
   "scene": [
    "ch5_peasant_camp_morning"
   ],
   "purpose": "Improvised peasants camp in a meadow by a village, morning. Carts and linen shelters at far left and right, a SMALL extinguishing hearth rear right, food sacks, farm tools and only a few pikes. Six tiny tired people at back edges. Not a professional army. Broad empty grounded conversation area centre.",
   "dimensions": {
    "width": 1024,
    "height": 768
   },
   "transparent": false,
   "alphaBounds": {
    "x": 0,
    "y": 0,
    "width": 1024,
    "height": 768
   },
   "preferredStaging": [
    {
     "id": "konrad",
     "x": 29,
     "bodyHeight": 48,
     "footline": 71,
     "facing": "right",
     "mirror": true
    },
    {
     "id": "matthes",
     "x": 52,
     "bodyHeight": 48,
     "footline": 71,
     "facing": "left",
     "mirror": false
    },
    {
     "id": "band1",
     "x": 75,
     "bodyHeight": 48,
     "footline": 71,
     "facing": "left",
     "mirror": true
    }
   ],
   "footline": 71,
   "safeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26,
    "units": "percent"
   },
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "A"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Raumplatte proportional darstellen; Körper-Bounds des bestehenden Canon-Renderers verwenden.",
   "sha256": "31313f5326659fb5527f6a8771f8d0f00302724363e39b58d70b344ca55aec20"
  },
  "bg_road_with_peasant_band": {
   "filename": "ch5_bg_road_with_peasant_band.png",
   "path": "assets/chapter5/backgrounds/ch5_bg_road_with_peasant_band.png",
   "type": "backgrounds",
   "scene": [
    "ch5_road_with_peasant_band"
   ],
   "purpose": "Wide earthen road leading away between meadows toward distant modest roofs. Small heterogeneous group and cart departing in background x70 y43, not an army formation. Empty foreground road and verge.",
   "dimensions": {
    "width": 1024,
    "height": 768
   },
   "transparent": false,
   "alphaBounds": {
    "x": 0,
    "y": 0,
    "width": 1024,
    "height": 768
   },
   "preferredStaging": [
    {
     "id": "konrad",
     "x": 30,
     "bodyHeight": 42,
     "footline": 71,
     "facing": "right",
     "mirror": true
    },
    {
     "id": "matthes",
     "x": 65,
     "bodyHeight": 42,
     "footline": 71,
     "facing": "left",
     "mirror": false
    }
   ],
   "footline": 71,
   "safeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26,
    "units": "percent"
   },
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "A"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Raumplatte proportional darstellen; Körper-Bounds des bestehenden Canon-Renderers verwenden.",
   "sha256": "e2dca3b94f1d0ef30187c6c8fda0e69446d7c65c69b82bfb27313fdeba10c4fd"
  },
  "bg_road_stopped_dues_cart": {
   "filename": "ch5_bg_road_stopped_dues_cart.png",
   "path": "assets/chapter5/backgrounds/ch5_bg_road_stopped_dues_cart.png",
   "type": "backgrounds",
   "scene": [
    "ch5_road_stopped_dues_cart"
   ],
   "purpose": "Broad dry country road widening into a roadside passing bay. One realistic stationary wooden dues cart, wheels on ground, in REAR RIGHT bay x78 y48, no horse across foreground. Centre and both foreground verges empty for conversation, abundant room to pass.",
   "dimensions": {
    "width": 1024,
    "height": 768
   },
   "transparent": false,
   "alphaBounds": {
    "x": 0,
    "y": 0,
    "width": 1024,
    "height": 768
   },
   "preferredStaging": [
    {
     "id": "peter",
     "x": 25,
     "bodyHeight": 36,
     "footline": 71,
     "facing": "right",
     "mirror": false
    },
    {
     "id": "konrad",
     "x": 48,
     "bodyHeight": 36,
     "footline": 71,
     "facing": "left",
     "mirror": false
    },
    {
     "id": "matthes",
     "x": 68,
     "bodyHeight": 36,
     "footline": 71,
     "facing": "left",
     "mirror": false
    }
   ],
   "footline": 71,
   "safeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26,
    "units": "percent"
   },
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "A"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Raumplatte proportional darstellen; Körper-Bounds des bestehenden Canon-Renderers verwenden.",
   "sha256": "7cf01f56b4237c57ffea0227538df181f33f17dc27548631f178170a3176d5a4"
  },
  "bg_camp_prisoner": {
   "filename": "ch5_bg_camp_prisoner.png",
   "path": "assets/chapter5/backgrounds/ch5_bg_camp_prisoner.png",
   "type": "backgrounds",
   "scene": [
    "ch5_camp_prisoner"
   ],
   "purpose": "Quiet side of improvised peasant camp, a modest bench along rear left shelter wall for a detained adult to rest; no person baked into bench. Rear supply cart and linen shelter. Broad empty dry foreground for four standing people. No cage, stocks, chains or torture.",
   "dimensions": {
    "width": 1024,
    "height": 768
   },
   "transparent": false,
   "alphaBounds": {
    "x": 0,
    "y": 0,
    "width": 1024,
    "height": 768
   },
   "preferredStaging": [
    {
     "id": "konrad",
     "x": 15,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "right",
     "mirror": true
    },
    {
     "id": "envoy",
     "x": 38,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": false
    },
    {
     "id": "anna",
     "x": 62,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": false
    },
    {
     "id": "jakob",
     "x": 85,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": false
    }
   ],
   "footline": 71,
   "safeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26,
    "units": "percent"
   },
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "A/E"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Raumplatte proportional darstellen; Körper-Bounds des bestehenden Canon-Renderers verwenden.",
   "sha256": "809c666c4722c3d1c0b0f618008dfd4e585c49089bdbac7d93ec9bdaf9c83d32"
  },
  "bg_negotiation_chamber": {
   "filename": "ch5_bg_negotiation_chamber.png",
   "path": "assets/chapter5/backgrounds/ch5_bg_negotiation_chamber.png",
   "type": "backgrounds",
   "scene": [
    "ch5_negotiation_chamber"
   ],
   "purpose": "Small 1525 administrative council chamber, plaster walls, plain timber beams, side window, modest chest, unadorned rear door right. Wooden negotiating table located BACK CENTRE x40–62 y42–55, legs firmly on floor, empty cream papers and wax seal on table, no chairs across foreground. Empty foreground standing zones left and right; neither palace nor dungeon.",
   "dimensions": {
    "width": 1024,
    "height": 768
   },
   "transparent": false,
   "alphaBounds": {
    "x": 0,
    "y": 0,
    "width": 1024,
    "height": 768
   },
   "preferredStaging": [
    {
     "id": "peter",
     "x": 22,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "right",
     "mirror": false
    },
    {
     "id": "anna",
     "x": 39,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": false
    },
    {
     "id": "overseer",
     "x": 77,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": false
    }
   ],
   "footline": 71,
   "safeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26,
    "units": "percent"
   },
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "B"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Raumplatte proportional darstellen; Körper-Bounds des bestehenden Canon-Renderers verwenden.",
   "sha256": "b239140c31f2d250fdcab42691d3c324f1d7b10a2ade7e8bd374ce0dc3abdce4"
  },
  "bg_theological_council_evening": {
   "filename": "ch5_bg_theological_council_evening.png",
   "path": "assets/chapter5/backgrounds/ch5_bg_theological_council_evening.png",
   "type": "backgrounds",
   "scene": [
    "ch5_theological_council_evening"
   ],
   "purpose": "Small parish communal room at evening, warm candles balanced with blue dusk window, few distant unsettled silhouettes outside a small rear doorway. A modest table BACK CENTRE x41–62 y44–56 carrying open modest Bible, only two folded loose sheets, candle. Clearly active urgent consultation, not book library. Empty foreground standing areas left/right.",
   "dimensions": {
    "width": 1024,
    "height": 768
   },
   "transparent": false,
   "alphaBounds": {
    "x": 0,
    "y": 0,
    "width": 1024,
    "height": 768
   },
   "preferredStaging": [
    {
     "id": "jakob",
     "x": 25,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "right",
     "mirror": true
    },
    {
     "id": "anna",
     "x": 48,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": false
    },
    {
     "id": "preacher",
     "x": 74,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": true
    }
   ],
   "footline": 71,
   "safeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26,
    "units": "percent"
   },
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "C"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Raumplatte proportional darstellen; Körper-Bounds des bestehenden Canon-Renderers verwenden.",
   "sha256": "9600c20116502cb8cfdaee437289c66f5908d0ca7eb69399288cf09e52c34d09"
  },
  "bg_churchyard_dispute": {
   "filename": "ch5_bg_churchyard_dispute.png",
   "path": "assets/chapter5/backgrounds/ch5_bg_churchyard_dispute.png",
   "type": "backgrounds",
   "scene": [
    "ch5_churchyard_dispute"
   ],
   "purpose": "Modest village churchyard forecourt, recognisable plain small stone church with tiled roof, cottage wall, two quiet separate gathering zones at FAR rear left and right, leave these zones empty for transparent group layers. Empty central conversation area. No monumental cathedral, no moral light/dark split.",
   "dimensions": {
    "width": 1024,
    "height": 768
   },
   "transparent": false,
   "alphaBounds": {
    "x": 0,
    "y": 0,
    "width": 1024,
    "height": 768
   },
   "preferredStaging": [
    {
     "id": "jakob",
     "x": 38,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "right",
     "mirror": true
    },
    {
     "id": "preacher",
     "x": 62,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": true
    }
   ],
   "footline": 71,
   "safeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26,
    "units": "percent"
   },
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "D"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Raumplatte proportional darstellen; Körper-Bounds des bestehenden Canon-Renderers verwenden.",
   "sha256": "92f2f0c5293382ac848b938f092b2ca1574694b5e1eca3f51835819ad76c45ff"
  },
  "bg_village_prisoner_courtyard": {
   "filename": "ch5_bg_village_prisoner_courtyard.png",
   "path": "assets/chapter5/backgrounds/ch5_bg_village_prisoner_courtyard.png",
   "type": "backgrounds",
   "scene": [
    "ch5_village_prisoner_courtyard"
   ],
   "purpose": "Small calm timber and plaster village courtyard, plain wall and rear gate, modest empty bench against rear wall left, no stocks, torture or jail. Ground and broad central standing area free for four adults including detained messenger. Rear shade makes power asymmetry plausible without brutality.",
   "dimensions": {
    "width": 1024,
    "height": 768
   },
   "transparent": false,
   "alphaBounds": {
    "x": 0,
    "y": 0,
    "width": 1024,
    "height": 768
   },
   "preferredStaging": [
    {
     "id": "konrad",
     "x": 15,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "right",
     "mirror": true
    },
    {
     "id": "envoy",
     "x": 38,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": false
    },
    {
     "id": "anna",
     "x": 62,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": false
    },
    {
     "id": "jakob",
     "x": 85,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": false
    }
   ],
   "footline": 71,
   "safeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26,
    "units": "percent"
   },
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "B/C/D/E"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Raumplatte proportional darstellen; Körper-Bounds des bestehenden Canon-Renderers verwenden.",
   "sha256": "f3cdd66cec57cb41f39581bdf056b1c6caaf74ad1b2a77c6495f05fedd56a920"
  },
  "bg_road_troops_approaching": {
   "filename": "ch5_bg_road_troops_approaching.png",
   "path": "assets/chapter5/backgrounds/ch5_bg_road_troops_approaching.png",
   "type": "backgrounds",
   "scene": [
    "ch5_road_troops_approaching"
   ],
   "purpose": "Rural road curving toward distant hillside. SMALL organised troops only on distant road x73–91 y36–45, restrained pikes and simple banner; no close soldiers, battle, guns or heroic action. Empty wide road foreground for two people. Threat through distant orderly presence, muted daylight.",
   "dimensions": {
    "width": 1024,
    "height": 768
   },
   "transparent": false,
   "alphaBounds": {
    "x": 0,
    "y": 0,
    "width": 1024,
    "height": 768
   },
   "preferredStaging": [
    {
     "id": "matthes",
     "x": 29,
     "bodyHeight": 42,
     "footline": 71,
     "facing": "right",
     "mirror": true
    },
    {
     "id": "peter",
     "x": 65,
     "bodyHeight": 42,
     "footline": 71,
     "facing": "left",
     "mirror": true
    }
   ],
   "footline": 71,
   "safeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26,
    "units": "percent"
   },
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "F"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Raumplatte proportional darstellen; Körper-Bounds des bestehenden Canon-Renderers verwenden.",
   "sha256": "1dd472793e540d2f22d81630e5b9bee3257506707c1259ed0513e568f10a1de8"
  },
  "bg_village_after_crisis": {
   "filename": "ch5_bg_village_after_crisis.png",
   "path": "assets/chapter5/backgrounds/ch5_bg_village_after_crisis.png",
   "type": "backgrounds",
   "scene": [
    "ch5_village_after_crisis"
   ],
   "purpose": "EDIT reference village: preserve EXACT church at rear right, crooked tiled half timber farm central left, left well, tavern with hanging mug sign right, camera, horizon and street architecture. Quieter cloudy morning, doors closed, one small damaged handcart against left farmhouse wall, a blank flyer in roadside mud near rear right and modest supply blanket under far right eaves. No people, ruins, fire or total destruction. Central foreground remains empty.",
   "dimensions": {
    "width": 1024,
    "height": 768
   },
   "transparent": false,
   "alphaBounds": {
    "x": 0,
    "y": 0,
    "width": 1024,
    "height": 768
   },
   "preferredStaging": [
    {
     "id": "anna",
     "x": 28,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "right",
     "mirror": true
    },
    {
     "id": "peter",
     "x": 51,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": true
    },
    {
     "id": "jakob",
     "x": 74,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": false
    }
   ],
   "footline": 71,
   "safeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26,
    "units": "percent"
   },
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "G"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Raumplatte proportional darstellen; Körper-Bounds des bestehenden Canon-Renderers verwenden.",
   "sha256": "9fc31e43bd7b37030c311af0e23d2253db1901f52923a6d24b07ce2bc065f173"
  },
  "overlay_camp_supply": {
   "filename": "ch5_overlay_camp_supply.png",
   "path": "assets/chapter5/overlays/ch5_overlay_camp_supply.png",
   "type": "overlays",
   "scene": [
    "ch5_peasant_camp_morning"
   ],
   "purpose": "Three modest food sacks, wicker basket and rolled linen at rear LEFT x7–20%, y46–59%, canvas otherwise transparent. No people.",
   "dimensions": {
    "width": 1024,
    "height": 768
   },
   "transparent": true,
   "alphaBounds": {
    "x": 0,
    "y": 37,
    "width": 838,
    "height": 563
   },
   "preferredStaging": {
    "scale": 0.401569,
    "left": 3.6863,
    "top": 26.0131,
    "units": "percent of entire scene; transform-origin top-left",
    "visibleAlphaBounds": [
     8,
     319,
     365,
     497
    ],
    "required": true
   },
   "footline": null,
   "safeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26,
    "units": "percent"
   },
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "A"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Einzeln über registrierter Raumplatte; keine automatische Kombination. Verbindliche Registrierung aus preferredStaging anwenden; nie ungeprüft als 100%-Layer auflegen. Einheitlicher Maßstab der dargestellten Körper wird anhand der Tiefe festgelegt.",
   "sha256": "834459a5f1a2b0bb1ca354ec2c949d495f453de511d6b01963d398384e37891f"
  },
  "overlay_camp_departure": {
   "filename": "ch5_overlay_camp_departure.png",
   "path": "assets/chapter5/overlays/ch5_overlay_camp_departure.png",
   "type": "overlays",
   "scene": [
    "ch5_road_with_peasant_band"
   ],
   "purpose": "One small departing cart and three SMALL back-view villagers in rear RIGHT x72–91%, feet y54%, body heights12%, facing away right; canvas otherwise transparent.",
   "dimensions": {
    "width": 1024,
    "height": 768
   },
   "transparent": true,
   "alphaBounds": {
    "x": 63,
    "y": 15,
    "width": 892,
    "height": 690
   },
   "preferredStaging": {
    "scale": 0.601043,
    "left": 34.3391,
    "top": 16.2609,
    "units": "percent of entire scene; transform-origin top-left",
    "visibleAlphaBounds": [
     672,
     265,
     952,
     380
    ],
    "required": true
   },
   "footline": null,
   "safeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26,
    "units": "percent"
   },
   "textSafeArea": [],
   "viewDirection": "away",
   "branchUse": [
    "A"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Einzeln über registrierter Raumplatte; keine automatische Kombination. Verbindliche Registrierung aus preferredStaging anwenden; nie ungeprüft als 100%-Layer auflegen. Einheitlicher Maßstab der dargestellten Körper wird anhand der Tiefe festgelegt.",
   "sha256": "b035aa3e4553e894979921672f3e1b454274abcefe1bce0a343b714a66c1b334"
  },
  "overlay_armed_tension": {
   "filename": "ch5_overlay_armed_tension.png",
   "path": "assets/chapter5/overlays/ch5_overlay_armed_tension.png",
   "type": "overlays",
   "scene": [
    "ch5_peasant_camp_morning"
   ],
   "purpose": "Three SMALL ordinary peasants with restrained pike and farm tool at back LEFT x5–22%, feet57%, body height17%; tired tense but not attacking.",
   "dimensions": {
    "width": 1024,
    "height": 768
   },
   "transparent": true,
   "alphaBounds": {
    "x": 40,
    "y": 30,
    "width": 794,
    "height": 646
   },
   "preferredStaging": {
    "scale": 0.510111,
    "left": 1.8127,
    "top": 19.9594,
    "units": "percent of entire scene; transform-origin top-left",
    "visibleAlphaBounds": [
     47,
     106,
     362,
     377
    ],
    "required": true
   },
   "footline": null,
   "safeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26,
    "units": "percent"
   },
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "A"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Einzeln über registrierter Raumplatte; keine automatische Kombination. Verbindliche Registrierung aus preferredStaging anwenden; nie ungeprüft als 100%-Layer auflegen. Einheitlicher Maßstab der dargestellten Körper wird anhand der Tiefe festgelegt.",
   "sha256": "1f37a0a7f3ad6c85e5238653fa82dc4ccf8ab60061e1795c1ac1a4a91182bbf1"
  },
  "overlay_negotiation_broken": {
   "filename": "ch5_overlay_negotiation_broken.png",
   "path": "assets/chapter5/overlays/ch5_overlay_negotiation_broken.png",
   "type": "overlays",
   "scene": [
    "ch5_negotiation_chamber"
   ],
   "purpose": "Closed leather folio and folded letter with small wax seal on tabletop at x45–55%, y46–50%; NO furniture, person or door.",
   "dimensions": {
    "width": 1024,
    "height": 768
   },
   "transparent": true,
   "alphaBounds": {
    "x": 63,
    "y": 15,
    "width": 877,
    "height": 713
   },
   "preferredStaging": {
    "scale": 0.30797,
    "left": 39.5865,
    "top": 24.2356,
    "units": "percent of entire scene; transform-origin top-left",
    "visibleAlphaBounds": [
     313,
     287,
     712,
     443
    ],
    "required": true
   },
   "footline": null,
   "safeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26,
    "units": "percent"
   },
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "B"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Einzeln über registrierter Raumplatte; keine automatische Kombination. Verbindliche Registrierung aus preferredStaging anwenden; nie ungeprüft als 100%-Layer auflegen. Einheitlicher Maßstab der dargestellten Körper wird anhand der Tiefe festgelegt.",
   "sha256": "20d8003356b4fce35c35a0275c77e57f19b655398a27d3e7ce6837328b3fe60b"
  },
  "overlay_delegation_inside": {
   "filename": "ch5_overlay_delegation_inside.png",
   "path": "assets/chapter5/overlays/ch5_overlay_delegation_inside.png",
   "type": "overlays",
   "scene": [
    "ch5_negotiation_chamber"
   ],
   "purpose": "Two modest linen caps and rolled blank petition set on BACK negotiating tabletop x44–56%, y47–51%, signalling waiting delegation indirectly; no figures or furniture.",
   "dimensions": {
    "width": 1024,
    "height": 768
   },
   "transparent": true,
   "alphaBounds": {
    "x": 63,
    "y": 15,
    "width": 940,
    "height": 726
   },
   "preferredStaging": {
    "scale": 0.192948,
    "left": 44.9852,
    "top": 29.9659,
    "units": "percent of entire scene; transform-origin top-left",
    "visibleAlphaBounds": [
     160,
     312,
     903,
     479
    ],
    "required": true
   },
   "footline": null,
   "safeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26,
    "units": "percent"
   },
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "B"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Einzeln über registrierter Raumplatte; keine automatische Kombination. Verbindliche Registrierung aus preferredStaging anwenden; nie ungeprüft als 100%-Layer auflegen. Einheitlicher Maßstab der dargestellten Körper wird anhand der Tiefe festgelegt.",
   "sha256": "26663a6f26efaa1db129777fa9457b82fb1240639dbe65b867d523a88e21670c"
  },
  "overlay_order_group": {
   "filename": "ch5_overlay_order_group.png",
   "path": "assets/chapter5/overlays/ch5_overlay_order_group.png",
   "type": "overlays",
   "scene": [
    "ch5_churchyard_dispute"
   ],
   "purpose": "Three SMALL ordinary villagers (mixed ages and gender) quietly listening at rear LEFT x5–22%, feet58%, body heights18%. Restrained attentive hands. Warm ochre/green linen, serious and humane.",
   "dimensions": {
    "width": 1024,
    "height": 768
   },
   "transparent": true,
   "alphaBounds": {
    "x": 0,
    "y": 51,
    "width": 838,
    "height": 677
   },
   "preferredStaging": {
    "scale": 0.406588,
    "left": 8.461,
    "top": 27.2824,
    "units": "percent of entire scene; transform-origin top-left",
    "visibleAlphaBounds": [
     0,
     108,
     279,
     448
    ],
    "required": true
   },
   "footline": null,
   "safeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26,
    "units": "percent"
   },
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "D"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Einzeln über registrierter Raumplatte; keine automatische Kombination. Verbindliche Registrierung aus preferredStaging anwenden; nie ungeprüft als 100%-Layer auflegen. Einheitlicher Maßstab der dargestellten Körper wird anhand der Tiefe festgelegt.",
   "sha256": "89c9d0ffdfb79ad5216efaecdcadb0a9e696b12fd58111122dc29506760cb889"
  },
  "overlay_justice_group": {
   "filename": "ch5_overlay_justice_group.png",
   "path": "assets/chapter5/overlays/ch5_overlay_justice_group.png",
   "type": "overlays",
   "scene": [
    "ch5_churchyard_dispute"
   ],
   "purpose": "Three SMALL ordinary villagers (mixed ages and gender) discussing earnestly at rear RIGHT x78–95%, feet58%, body heights18%. One open hand, no fist/raised weapons. Same warm ochre/green palette, light and dignity as order group.",
   "dimensions": {
    "width": 1024,
    "height": 768
   },
   "transparent": true,
   "alphaBounds": {
    "x": 61,
    "y": 14,
    "width": 953,
    "height": 691
   },
   "preferredStaging": {
    "scale": 0.445935,
    "left": 50.3105,
    "top": 21.0387,
    "units": "percent of entire scene; transform-origin top-left",
    "visibleAlphaBounds": [
     674,
     206,
     1011,
     516
    ],
    "required": true
   },
   "footline": null,
   "safeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26,
    "units": "percent"
   },
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "D"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Einzeln über registrierter Raumplatte; keine automatische Kombination. Verbindliche Registrierung aus preferredStaging anwenden; nie ungeprüft als 100%-Layer auflegen. Einheitlicher Maßstab der dargestellten Körper wird anhand der Tiefe festgelegt.",
   "sha256": "5eae0b34a79544d9ddce92c3b9f0ab1401b8a9d483e4bd82e24732ff30f1be6c"
  },
  "overlay_wounded_return": {
   "filename": "ch5_overlay_wounded_return.png",
   "path": "assets/chapter5/overlays/ch5_overlay_wounded_return.png",
   "type": "overlays",
   "scene": [
    "ch5_theological_council_evening"
   ],
   "purpose": "TWO small full-body ordinary villagers at rear LEFT x5–23%, feet60%, height22%: exhausted man with unobtrusive linen wrapped forearm supported gently by companion. No blood, graphic wound, hero pose.",
   "dimensions": {
    "width": 1024,
    "height": 768
   },
   "transparent": true,
   "alphaBounds": {
    "x": 46,
    "y": 15,
    "width": 890,
    "height": 712
   },
   "preferredStaging": {
    "scale": 0.554513,
    "left": 1.796,
    "top": 24.3971,
    "units": "percent of entire scene; transform-origin top-left",
    "visibleAlphaBounds": [
     49,
     133,
     254,
     410
    ],
    "required": true
   },
   "footline": null,
   "safeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26,
    "units": "percent"
   },
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "C"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Einzeln über registrierter Raumplatte; keine automatische Kombination. Verbindliche Registrierung aus preferredStaging anwenden; nie ungeprüft als 100%-Layer auflegen. Einheitlicher Maßstab der dargestellten Körper wird anhand der Tiefe festgelegt.",
   "sha256": "64ef3972e1031f2e05ae10ee8aa8e39006991d8520138cb45872a447573baf47"
  },
  "overlay_people_evacuating": {
   "filename": "ch5_overlay_people_evacuating.png",
   "path": "assets/chapter5/overlays/ch5_overlay_people_evacuating.png",
   "type": "overlays",
   "scene": [
    "ch5_road_troops_approaching"
   ],
   "purpose": "Three SMALL back-view villagers at rear LEFT x4–24%, feet59%, heights18%; adult with modest bundle, child, older adult walking calmly together toward left side alley.",
   "dimensions": {
    "width": 1024,
    "height": 768
   },
   "transparent": true,
   "alphaBounds": {
    "x": 32,
    "y": 14,
    "width": 902,
    "height": 731
   },
   "preferredStaging": {
    "scale": 0.527634,
    "left": 1.9781,
    "top": 20.916,
    "units": "percent of entire scene; transform-origin top-left",
    "visibleAlphaBounds": [
     35,
     205,
     354,
     467
    ],
    "required": true
   },
   "footline": null,
   "safeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26,
    "units": "percent"
   },
   "textSafeArea": [],
   "viewDirection": "away",
   "branchUse": [
    "F"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Einzeln über registrierter Raumplatte; keine automatische Kombination. Verbindliche Registrierung aus preferredStaging anwenden; nie ungeprüft als 100%-Layer auflegen. Einheitlicher Maßstab der dargestellten Körper wird anhand der Tiefe festgelegt.",
   "sha256": "87a02d911abfd25af485a1e0d4e759378aff77022dc7809c8d615a6d2ae62018"
  },
  "overlay_group_retreat": {
   "filename": "ch5_overlay_group_retreat.png",
   "path": "assets/chapter5/overlays/ch5_overlay_group_retreat.png",
   "type": "overlays",
   "scene": [
    "ch5_road_with_peasant_band",
    "ch5_road_troops_approaching"
   ],
   "purpose": "Four SMALL farmers walking away in middle/rear RIGHT x73–94%, feet56%, heights15%; one blanket roll, lowered farm tool, tired orderly retreat; no panic or action.",
   "dimensions": {
    "width": 1024,
    "height": 768
   },
   "transparent": true,
   "alphaBounds": {
    "x": 40,
    "y": 14,
    "width": 925,
    "height": 730
   },
   "preferredStaging": {
    "scale": 0.379929,
    "left": 58.4717,
    "top": 23.2261,
    "units": "percent of entire scene; transform-origin top-left",
    "visibleAlphaBounds": [
     485,
     238,
     945,
     521
    ],
    "required": true
   },
   "footline": null,
   "safeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26,
    "units": "percent"
   },
   "textSafeArea": [],
   "viewDirection": "away",
   "branchUse": [
    "A",
    "F"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Einzeln über registrierter Raumplatte; keine automatische Kombination. Verbindliche Registrierung aus preferredStaging anwenden; nie ungeprüft als 100%-Layer auflegen. Einheitlicher Maßstab der dargestellten Körper wird anhand der Tiefe festgelegt.",
   "sha256": "f94e9fc9c4f6e622d2e04183e6ccf71c9c8cb056ba9aa461c1223b794d32aa37"
  },
  "overlay_distant_troops": {
   "filename": "ch5_overlay_distant_troops.png",
   "path": "assets/chapter5/overlays/ch5_overlay_distant_troops.png",
   "type": "overlays",
   "scene": [
    "ch5_road_with_peasant_band"
   ],
   "purpose": "Six TINY organised guards with simple pikes on distant road at x73–94%, feet43%, height6%; neutral authority, no heroic pose. Transparent everywhere else.",
   "dimensions": {
    "width": 1024,
    "height": 768
   },
   "transparent": true,
   "alphaBounds": {
    "x": 40,
    "y": 15,
    "width": 920,
    "height": 690
   },
   "preferredStaging": {
    "scale": 0.363243,
    "left": 50.5752,
    "top": 20.3311,
    "units": "percent of entire scene; transform-origin top-left",
    "visibleAlphaBounds": [
     701,
     289,
     958,
     437
    ],
    "required": true
   },
   "footline": null,
   "safeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26,
    "units": "percent"
   },
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "A"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Einzeln über registrierter Raumplatte; keine automatische Kombination. Verbindliche Registrierung aus preferredStaging anwenden; nie ungeprüft als 100%-Layer auflegen. Einheitlicher Maßstab der dargestellten Körper wird anhand der Tiefe festgelegt.",
   "sha256": "42a687cf59c1fa56818734b5e0a8518b329d49624cf2c2a9dfce6638d2294665"
  },
  "overlay_after_defeat": {
   "filename": "ch5_overlay_after_defeat.png",
   "path": "assets/chapter5/overlays/ch5_overlay_after_defeat.png",
   "type": "overlays",
   "scene": [
    "ch5_village_after_crisis"
   ],
   "purpose": "On SAME reference after-crisis village: sparse abandoned farm tool and rolled torn blanket at x8–19 y51–58%; two SMALL exhausted villagers helping one another under far-right eaves x82–94%, feet58%, height17%. No corpses, blood or centre group.",
   "dimensions": {
    "width": 1024,
    "height": 768
   },
   "transparent": true,
   "alphaBounds": {
    "x": 33,
    "y": 38,
    "width": 934,
    "height": 690
   },
   "preferredStaging": {
    "scale": 1,
    "left": 0,
    "top": -10,
    "units": "percent of entire scene; transform-origin top-left",
    "visibleAlphaBounds": [
     37,
     330,
     964,
     501
    ],
    "required": true
   },
   "footline": null,
   "safeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26,
    "units": "percent"
   },
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "G"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Einzeln über registrierter Raumplatte; keine automatische Kombination. Verbindliche Registrierung aus preferredStaging anwenden; nie ungeprüft als 100%-Layer auflegen. Einheitlicher Maßstab der dargestellten Körper wird anhand der Tiefe festgelegt.",
   "sha256": "4a00b403fa69bfa6b9663a38bb754fdb9fb60934efc0856df8415f6e5e9e0685"
  },
  "overlay_after_negotiation_collapse": {
   "filename": "ch5_overlay_after_negotiation_collapse.png",
   "path": "assets/chapter5/overlays/ch5_overlay_after_negotiation_collapse.png",
   "type": "overlays",
   "scene": [
    "ch5_village_after_crisis"
   ],
   "purpose": "On SAME reference after-crisis village: small unlettered sealed notice fixed to right tavern door x91 y41%; one SMALL ordinary unarmoured authority guard at far right x88%, feet58%, height18%, serious not evil; rolled unaccepted petition on far-left bench x8 y52%.",
   "dimensions": {
    "width": 1024,
    "height": 768
   },
   "transparent": true,
   "alphaBounds": {
    "x": 26,
    "y": 37,
    "width": 986,
    "height": 668
   },
   "preferredStaging": {
    "scale": 1,
    "left": 0,
    "top": -3,
    "units": "percent of entire scene; transform-origin top-left",
    "visibleAlphaBounds": [
     30,
     199,
     1009,
     493
    ],
    "required": true
   },
   "footline": null,
   "safeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26,
    "units": "percent"
   },
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "G"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Einzeln über registrierter Raumplatte; keine automatische Kombination. Verbindliche Registrierung aus preferredStaging anwenden; nie ungeprüft als 100%-Layer auflegen. Einheitlicher Maßstab der dargestellten Körper wird anhand der Tiefe festgelegt.",
   "sha256": "780759fd9158e018804084ec7254a7d7395af33962440f9390e73388e2ce14da"
  },
  "overlay_after_protection": {
   "filename": "ch5_overlay_after_protection.png",
   "path": "assets/chapter5/overlays/ch5_overlay_after_protection.png",
   "type": "overlays",
   "scene": [
    "ch5_village_after_crisis"
   ],
   "purpose": "On SAME reference after-crisis village: three SMALL sheltered villagers far LEFT x5–21%, feet57%, heights16%, distributing bread and folded blanket quietly. No celebration, victory or main Canon people.",
   "dimensions": {
    "width": 1024,
    "height": 768
   },
   "transparent": true,
   "alphaBounds": {
    "x": 12,
    "y": 142,
    "width": 825,
    "height": 449
   },
   "preferredStaging": {
    "scale": 1,
    "left": 0,
    "top": 0,
    "units": "percent of entire scene; transform-origin top-left",
    "visibleAlphaBounds": [
     16,
     239,
     259,
     439
    ],
    "required": true
   },
   "footline": null,
   "safeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26,
    "units": "percent"
   },
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "G"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Einzeln über registrierter Raumplatte; keine automatische Kombination. Verbindliche Registrierung aus preferredStaging anwenden; nie ungeprüft als 100%-Layer auflegen. Einheitlicher Maßstab der dargestellten Körper wird anhand der Tiefe festgelegt.",
   "sha256": "3170bf8f91919ff8f268254c7db8509b32ce9ba8a6559062c43e37a5cecb1f93"
  },
  "overlay_after_fragmentation": {
   "filename": "ch5_overlay_after_fragmentation.png",
   "path": "assets/chapter5/overlays/ch5_overlay_after_fragmentation.png",
   "type": "overlays",
   "scene": [
    "ch5_village_after_crisis"
   ],
   "purpose": "On SAME reference after-crisis village: separate tiny departing pairs rear-left x6–20 and rear-right x80–94, feet56%, heights15%; two blank differing pamphlets beside rear path. No moral colour coding or aggression; broad centre empty.",
   "dimensions": {
    "width": 1024,
    "height": 768
   },
   "transparent": true,
   "alphaBounds": {
    "x": 29,
    "y": 37,
    "width": 995,
    "height": 691
   },
   "preferredStaging": {
    "scale": 1,
    "left": 0,
    "top": -6,
    "units": "percent of entire scene; transform-origin top-left",
    "visibleAlphaBounds": [
     46,
     288,
     1018,
     438
    ],
    "required": true
   },
   "footline": null,
   "safeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26,
    "units": "percent"
   },
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "G"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Einzeln über registrierter Raumplatte; keine automatische Kombination. Verbindliche Registrierung aus preferredStaging anwenden; nie ungeprüft als 100%-Layer auflegen. Einheitlicher Maßstab der dargestellten Körper wird anhand der Tiefe festgelegt.",
   "sha256": "6a9dee0bc7321aa80fb18a22add6b7bd43ad71a4f800d622a153f92e90beb9ca"
  },
  "overlay_after_deescalation": {
   "filename": "ch5_overlay_after_deescalation.png",
   "path": "assets/chapter5/overlays/ch5_overlay_after_deescalation.png",
   "type": "overlays",
   "scene": [
    "ch5_village_after_crisis"
   ],
   "purpose": "On SAME reference after-crisis village: one rolled-down plain banner and lowered farm tools far LEFT x7–18 y51–57%; two SMALL people talking quietly far-right x85–94 feet55%, height15%, blank disputed flyer still present. No triumph.",
   "dimensions": {
    "width": 1024,
    "height": 768
   },
   "transparent": true,
   "alphaBounds": {
    "x": 15,
    "y": 15,
    "width": 1009,
    "height": 611
   },
   "preferredStaging": {
    "scale": 1,
    "left": 0,
    "top": -9,
    "units": "percent of entire scene; transform-origin top-left",
    "visibleAlphaBounds": [
     19,
     401,
     1024,
     541
    ],
    "required": true
   },
   "footline": null,
   "safeArea": {
    "x": 0,
    "y": 74,
    "width": 100,
    "height": 26,
    "units": "percent"
   },
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "G"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Einzeln über registrierter Raumplatte; keine automatische Kombination. Verbindliche Registrierung aus preferredStaging anwenden; nie ungeprüft als 100%-Layer auflegen. Einheitlicher Maßstab der dargestellten Körper wird anhand der Tiefe festgelegt.",
   "sha256": "62f353cd52a7d3b440f765d6ebb5ce80d8c0be8f4f48ea73b6a0244de6b174c7"
  },
  "prop_tools_weapons_bundle": {
   "filename": "ch5_prop_tools_weapons_bundle.png",
   "path": "assets/chapter5/props/ch5_prop_tools_weapons_bundle.png",
   "type": "props",
   "scene": [
    "ch5_peasant_camp_morning"
   ],
   "purpose": "Small coherent bundle of ordinary 1525 wooden hoe, flail, pitchfork and one plain pike, no fantasy sword; isolated three-quarter view.",
   "dimensions": {
    "width": 768,
    "height": 768
   },
   "transparent": true,
   "alphaBounds": {
    "x": 14,
    "y": 13,
    "width": 733,
    "height": 744
   },
   "preferredStaging": [
    {
     "id": "konrad",
     "x": 29,
     "bodyHeight": 48,
     "footline": 71,
     "facing": "right",
     "mirror": true
    },
    {
     "id": "matthes",
     "x": 52,
     "bodyHeight": 48,
     "footline": 71,
     "facing": "left",
     "mirror": false
    },
    {
     "id": "band1",
     "x": 75,
     "bodyHeight": 48,
     "footline": 71,
     "facing": "left",
     "mirror": true
    }
   ],
   "footline": null,
   "safeArea": {},
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "A"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Nicht zusätzlich einfügen, falls bereits im Hintergrund vorhanden.",
   "sha256": "8fdc47303ea9240403ead130621bf27ec3b6d56579313bf09edb8995cd6e096c"
  },
  "prop_food_supplies": {
   "filename": "ch5_prop_food_supplies.png",
   "path": "assets/chapter5/props/ch5_prop_food_supplies.png",
   "type": "props",
   "scene": [
    "ch5_peasant_camp_morning"
   ],
   "purpose": "Modest wicker basket with rye bread, turnips, one tied linen flour sack and wooden water flask; isolated coherent still life.",
   "dimensions": {
    "width": 768,
    "height": 768
   },
   "transparent": true,
   "alphaBounds": {
    "x": 0,
    "y": 13,
    "width": 763,
    "height": 712
   },
   "preferredStaging": [
    {
     "id": "konrad",
     "x": 29,
     "bodyHeight": 48,
     "footline": 71,
     "facing": "right",
     "mirror": true
    },
    {
     "id": "matthes",
     "x": 52,
     "bodyHeight": 48,
     "footline": 71,
     "facing": "left",
     "mirror": false
    },
    {
     "id": "band1",
     "x": 75,
     "bodyHeight": 48,
     "footline": 71,
     "facing": "left",
     "mirror": true
    }
   ],
   "footline": null,
   "safeArea": {},
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "A"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Nicht zusätzlich einfügen, falls bereits im Hintergrund vorhanden.",
   "sha256": "b779721e1b7938236a2775e3183b1c2229de61c7bcb41a26e522c28a87dee2e0"
  },
  "prop_simple_banner": {
   "filename": "ch5_prop_simple_banner.png",
   "path": "assets/chapter5/props/ch5_prop_simple_banner.png",
   "type": "props",
   "scene": [],
   "purpose": "Plain off-white coarse linen small banner hanging from wooden staff, no emblem, slogan or text; isolated full object.",
   "dimensions": {
    "width": 768,
    "height": 768
   },
   "transparent": true,
   "alphaBounds": {
    "x": 56,
    "y": 3,
    "width": 687,
    "height": 765
   },
   "preferredStaging": {},
   "footline": null,
   "safeArea": {},
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Nicht zusätzlich einfügen, falls bereits im Hintergrund vorhanden.",
   "sha256": "a887354f79add7c7f742bc0c7d9d9af88ec20e5f0b92ed4224e32ec0920412c7"
  },
  "prop_dues_cart_stopped": {
   "filename": "ch5_prop_dues_cart_stopped.png",
   "path": "assets/chapter5/props/ch5_prop_dues_cart_stopped.png",
   "type": "props",
   "scene": [],
   "purpose": "Ordinary small wooden two-wheel handcart with tied sacks and one barrel, stationary, three-quarter view from front left, NO horse/person; entire cart wheels visible.",
   "dimensions": {
    "width": 768,
    "height": 768
   },
   "transparent": true,
   "alphaBounds": {
    "x": 0,
    "y": 5,
    "width": 768,
    "height": 763
   },
   "preferredStaging": {},
   "footline": null,
   "safeArea": {},
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Nicht zusätzlich einfügen, falls bereits im Hintergrund vorhanden.",
   "sha256": "b49730dbd342c531ddb2e5a6d5a569981273d2f6c655d50eb1910e3e2b4a31e0"
  },
  "prop_negotiation_terms": {
   "filename": "ch5_prop_negotiation_terms.png",
   "path": "assets/chapter5/props/ch5_prop_negotiation_terms.png",
   "type": "props",
   "scene": [
    "ch5_negotiation_chamber"
   ],
   "purpose": "One open folded cream parchment sheet with discreet corner fold and small wax seal, entirely blank centre for HTML; three-quarter overhead view.",
   "dimensions": {
    "width": 768,
    "height": 768
   },
   "transparent": true,
   "alphaBounds": {
    "x": 0,
    "y": 21,
    "width": 765,
    "height": 747
   },
   "preferredStaging": [
    {
     "id": "peter",
     "x": 22,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "right",
     "mirror": false
    },
    {
     "id": "anna",
     "x": 39,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": false
    },
    {
     "id": "overseer",
     "x": 77,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": false
    }
   ],
   "footline": null,
   "safeArea": {},
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "B"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Nicht zusätzlich einfügen, falls bereits im Hintergrund vorhanden.",
   "sha256": "ff48b9069147f05809b48e373780eb72a7112b6b4e0a4c6d56606bdb35d97762"
  },
  "prop_village_petition": {
   "filename": "ch5_prop_village_petition.png",
   "path": "assets/chapter5/props/ch5_prop_village_petition.png",
   "type": "props",
   "scene": [
    "ch5_negotiation_chamber"
   ],
   "purpose": "Coarse off-white petition sheet folded at bottom, two small linen ties, blank broad writing space, no letters or signatures.",
   "dimensions": {
    "width": 768,
    "height": 768
   },
   "transparent": true,
   "alphaBounds": {
    "x": 13,
    "y": 32,
    "width": 740,
    "height": 736
   },
   "preferredStaging": [
    {
     "id": "peter",
     "x": 22,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "right",
     "mirror": false
    },
    {
     "id": "anna",
     "x": 39,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": false
    },
    {
     "id": "overseer",
     "x": 77,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": false
    }
   ],
   "footline": null,
   "safeArea": {},
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "B"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Nicht zusätzlich einfügen, falls bereits im Hintergrund vorhanden.",
   "sha256": "dd3705bb1085eb5959a79d013bd7cdf97657bd1c761ef423d2510b38b44c54ec"
  },
  "prop_seal_and_wax": {
   "filename": "ch5_prop_seal_and_wax.png",
   "path": "assets/chapter5/props/ch5_prop_seal_and_wax.png",
   "type": "props",
   "scene": [
    "ch5_negotiation_chamber"
   ],
   "purpose": "Modest small brass seal stamp, dull red wax lump and one plain round wax impression, 1525 plausible, no readable heraldic writing.",
   "dimensions": {
    "width": 768,
    "height": 768
   },
   "transparent": true,
   "alphaBounds": {
    "x": 30,
    "y": 14,
    "width": 719,
    "height": 733
   },
   "preferredStaging": [
    {
     "id": "peter",
     "x": 22,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "right",
     "mirror": false
    },
    {
     "id": "anna",
     "x": 39,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": false
    },
    {
     "id": "overseer",
     "x": 77,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": false
    }
   ],
   "footline": null,
   "safeArea": {},
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "B"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Nicht zusätzlich einfügen, falls bereits im Hintergrund vorhanden.",
   "sha256": "c9bcdcf015f10704fdb80b647c512e4c073de73765e71c55212c261d0b59aef8"
  },
  "prop_bible_council": {
   "filename": "ch5_prop_bible_council.png",
   "path": "assets/chapter5/props/ch5_prop_bible_council.png",
   "type": "props",
   "scene": [
    "ch5_theological_council_evening"
   ],
   "purpose": "Modest thick leather-bound open Bible, two clear EMPTY cream pages and subtle red cloth marker, no text, no title, no luminous holy aura; three-quarter overhead view.",
   "dimensions": {
    "width": 768,
    "height": 768
   },
   "transparent": true,
   "alphaBounds": {
    "x": 0,
    "y": 12,
    "width": 768,
    "height": 756
   },
   "preferredStaging": [
    {
     "id": "jakob",
     "x": 25,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "right",
     "mirror": true
    },
    {
     "id": "anna",
     "x": 48,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": false
    },
    {
     "id": "preacher",
     "x": 74,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": true
    }
   ],
   "footline": null,
   "safeArea": {},
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "C"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Nicht zusätzlich einfügen, falls bereits im Hintergrund vorhanden.",
   "sha256": "97f3162db4bfa116a2771d621b6aafcb5363eea19454ce421dff007ad43f3985"
  },
  "prop_luther_text_stack": {
   "filename": "ch5_prop_luther_text_stack.png",
   "path": "assets/chapter5/props/ch5_prop_luther_text_stack.png",
   "type": "props",
   "scene": [
    "ch5_theological_council_evening"
   ],
   "purpose": "Three thin early printed pamphlets with blank cream cover leaves and dark simple woodcut-like border without lettering, visibly loose stitched paper distinct from bound Bible.",
   "dimensions": {
    "width": 768,
    "height": 768
   },
   "transparent": true,
   "alphaBounds": {
    "x": 10,
    "y": 42,
    "width": 738,
    "height": 726
   },
   "preferredStaging": [
    {
     "id": "jakob",
     "x": 25,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "right",
     "mirror": true
    },
    {
     "id": "anna",
     "x": 48,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": false
    },
    {
     "id": "preacher",
     "x": 74,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": true
    }
   ],
   "footline": null,
   "safeArea": {},
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "C"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Nicht zusätzlich einfügen, falls bereits im Hintergrund vorhanden.",
   "sha256": "8d18659acc0ce6ed3c1bdd4cb7d54e42ef6588303c08a077940cbe5feebd4d01"
  },
  "prop_emergency_report": {
   "filename": "ch5_prop_emergency_report.png",
   "path": "assets/chapter5/props/ch5_prop_emergency_report.png",
   "type": "props",
   "scene": [
    "ch5_theological_council_evening",
    "ch5_road_troops_approaching"
   ],
   "purpose": "One urgently folded blank letter held by simple loose flax thread, gently weathered but clean central text area, no text.",
   "dimensions": {
    "width": 768,
    "height": 768
   },
   "transparent": true,
   "alphaBounds": {
    "x": 29,
    "y": 12,
    "width": 729,
    "height": 756
   },
   "preferredStaging": [
    {
     "id": "jakob",
     "x": 25,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "right",
     "mirror": true
    },
    {
     "id": "anna",
     "x": 48,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": false
    },
    {
     "id": "preacher",
     "x": 74,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": true
    }
   ],
   "footline": null,
   "safeArea": {},
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "C",
    "F"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Nicht zusätzlich einfügen, falls bereits im Hintergrund vorhanden.",
   "sha256": "334660474d87c8fa8ddfdf600376f95606559ec6992b38f8bbbfe735f6cb632d"
  },
  "prop_competing_flyers": {
   "filename": "ch5_prop_competing_flyers.png",
   "path": "assets/chapter5/props/ch5_prop_competing_flyers.png",
   "type": "props",
   "scene": [
    "ch5_churchyard_dispute"
   ],
   "purpose": "Two equally sized blank contemporary pamphlets, one modest line border and one simple cross-line border, SAME neutral light cream paper, no moral contrasting colour or titles.",
   "dimensions": {
    "width": 768,
    "height": 768
   },
   "transparent": true,
   "alphaBounds": {
    "x": 18,
    "y": 5,
    "width": 743,
    "height": 763
   },
   "preferredStaging": [
    {
     "id": "jakob",
     "x": 38,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "right",
     "mirror": true
    },
    {
     "id": "preacher",
     "x": 62,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": true
    }
   ],
   "footline": null,
   "safeArea": {},
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "D"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Nicht zusätzlich einfügen, falls bereits im Hintergrund vorhanden.",
   "sha256": "6127d869b6f717a4e6df66f5953d98950f545bbe839dfc60dc103d3f13af752c"
  },
  "prop_public_bible": {
   "filename": "ch5_prop_public_bible.png",
   "path": "assets/chapter5/props/ch5_prop_public_bible.png",
   "type": "props",
   "scene": [
    "ch5_churchyard_dispute"
   ],
   "purpose": "Modest CLOSED brown leather Bible on small plain wooden lectern, no title, no dramatic halo, stable feet; entire object isolated.",
   "dimensions": {
    "width": 768,
    "height": 768
   },
   "transparent": true,
   "alphaBounds": {
    "x": 0,
    "y": 12,
    "width": 757,
    "height": 756
   },
   "preferredStaging": [
    {
     "id": "jakob",
     "x": 38,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "right",
     "mirror": true
    },
    {
     "id": "preacher",
     "x": 62,
     "bodyHeight": 41,
     "footline": 71,
     "facing": "left",
     "mirror": true
    }
   ],
   "footline": null,
   "safeArea": {},
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [
    "D"
   ],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Nicht zusätzlich einfügen, falls bereits im Hintergrund vorhanden.",
   "sha256": "31963ec2bfc4b5fc8ccb0e75f561f3e49df5304905d1f05454f5ebf2bc421524"
  },
  "prop_prisoner_rope_loose": {
   "filename": "ch5_prop_prisoner_rope_loose.png",
   "path": "assets/chapter5/props/ch5_prop_prisoner_rope_loose.png",
   "type": "props",
   "scene": [],
   "purpose": "Short loose coil of coarse flax rope lying flat, ends unknotted, no binding hands or person; tiny unobtrusive object. Optional narrative object only, not automatic prisoner restraint.",
   "dimensions": {
    "width": 768,
    "height": 768
   },
   "transparent": true,
   "alphaBounds": {
    "x": 30,
    "y": 30,
    "width": 727,
    "height": 721
   },
   "preferredStaging": {},
   "footline": null,
   "safeArea": {},
   "textSafeArea": [],
   "viewDirection": null,
   "branchUse": [],
   "integrationNotes": "Optionales loses Objekt. Für Gefangenen-Szenen nicht benötigt; in den QA-Kompositionen bewusst nicht verwendet.",
   "sha256": "1ca58475f10eea9944880c232e3d00258e25b08c89cc6cbbee3eee21d5f98472"
  },
  "ui_theological_arguments_table": {
   "filename": "ch5_ui_theological_arguments_table.png",
   "path": "assets/chapter5/ui/ch5_ui_theological_arguments_table.png",
   "type": "ui",
   "scene": [],
   "purpose": "Four large EMPTY clean light parchment sheets resting on a plain historical wooden tabletop viewed directly from above, 2x2 arrangement. Sheets interiors exactly (x6–47,y8–44),(x53–94,y8–44),(x6–47,y53–89),(x53–94,y53–89) percent. Straight flat rectangular areas, restrained rough edges, narrow wood gutters. No text, tabs, icons, controls or card shadows.",
   "dimensions": {
    "width": 1024,
    "height": 768
   },
   "transparent": false,
   "alphaBounds": {
    "x": 0,
    "y": 0,
    "width": 1024,
    "height": 768
   },
   "preferredStaging": {},
   "footline": null,
   "safeArea": {},
   "textSafeArea": [
    {
     "x": 15,
     "y": 9,
     "width": 31,
     "height": 34,
     "fontSize": 18,
     "maxTextLines": 7,
     "units": "percent"
    },
    {
     "x": 54,
     "y": 9,
     "width": 33,
     "height": 34,
     "fontSize": 18,
     "maxTextLines": 7,
     "units": "percent"
    },
    {
     "x": 15,
     "y": 53,
     "width": 31,
     "height": 35,
     "fontSize": 18,
     "maxTextLines": 7,
     "units": "percent"
    },
    {
     "x": 54,
     "y": 53,
     "width": 33,
     "height": 35,
     "fontSize": 18,
     "maxTextLines": 7,
     "units": "percent"
    }
   ],
   "viewDirection": null,
   "branchUse": [],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Text als HTML, mindestens18px; keine Bildzitate.",
   "sha256": "9d079dd8e93a62f6c80528556bd00faed39f5a696f86490190242393d6f494a9"
  },
  "ui_luther_four_thoughts": {
   "filename": "ch5_ui_luther_four_thoughts.png",
   "path": "assets/chapter5/ui/ch5_ui_luther_four_thoughts.png",
   "type": "ui",
   "scene": [],
   "purpose": "Large historical open manuscript spread, two broad pages each with TWO blank writing fields (top and bottom), visually divided only by subtle ruled divider, no separate cards. Writing interiors exactly (x8–47,y10–43),(x53–92,y10–43),(x8–47,y53–87),(x53–92,y53–87) percent. Clean very light warm parchment, narrow book gutter, dark brown leather edge. No text, title, symbols or controls.",
   "dimensions": {
    "width": 1024,
    "height": 768
   },
   "transparent": false,
   "alphaBounds": {
    "x": 0,
    "y": 0,
    "width": 1024,
    "height": 768
   },
   "preferredStaging": {},
   "footline": null,
   "safeArea": {},
   "textSafeArea": [
    {
     "x": 11,
     "y": 16,
     "width": 34,
     "height": 29,
     "fontSize": 18,
     "maxTextLines": 7,
     "units": "percent"
    },
    {
     "x": 55,
     "y": 16,
     "width": 35,
     "height": 29,
     "fontSize": 18,
     "maxTextLines": 7,
     "units": "percent"
    },
    {
     "x": 11,
     "y": 55,
     "width": 34,
     "height": 29,
     "fontSize": 18,
     "maxTextLines": 7,
     "units": "percent"
    },
    {
     "x": 55,
     "y": 55,
     "width": 35,
     "height": 29,
     "fontSize": 18,
     "maxTextLines": 7,
     "units": "percent"
    }
   ],
   "viewDirection": null,
   "branchUse": [],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Text als HTML, mindestens18px; keine Bildzitate.",
   "sha256": "02f0421cd14bcafec282220f14058fe01ebac3db598d9e73322bca712be0d873"
  },
  "ui_three_reports": {
   "filename": "ch5_ui_three_reports.png",
   "path": "assets/chapter5/ui/ch5_ui_three_reports.png",
   "type": "ui",
   "scene": [],
   "purpose": "Three LARGE different-shaped but matching blank folded letters lying flat next to each other on calm plain oak tabletop, nearly top-down. Interior writing areas (x5–31,y10–88),(x37–63,y10–88),(x69–95,y10–88) percent. Narrow wood gaps, broad light clean paper, no ornamental stains, text, seals across text areas or modern panels.",
   "dimensions": {
    "width": 1024,
    "height": 768
   },
   "transparent": false,
   "alphaBounds": {
    "x": 0,
    "y": 0,
    "width": 1024,
    "height": 768
   },
   "preferredStaging": {},
   "footline": null,
   "safeArea": {},
   "textSafeArea": [
    {
     "x": 7,
     "y": 20,
     "width": 26,
     "height": 63,
     "fontSize": 18,
     "maxTextLines": 16,
     "units": "percent"
    },
    {
     "x": 37,
     "y": 20,
     "width": 26,
     "height": 63,
     "fontSize": 18,
     "maxTextLines": 16,
     "units": "percent"
    },
    {
     "x": 69,
     "y": 20,
     "width": 26,
     "height": 63,
     "fontSize": 18,
     "maxTextLines": 16,
     "units": "percent"
    }
   ],
   "viewDirection": null,
   "branchUse": [],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Text als HTML, mindestens18px; keine Bildzitate.",
   "sha256": "5a37e8b8f9804eb37d86bfe70caee4bba2f4496de3716ad53c76d8c2f7003077"
  },
  "ui_religion_functions": {
   "filename": "ch5_ui_religion_functions.png",
   "path": "assets/chapter5/ui/ch5_ui_religion_functions.png",
   "type": "ui",
   "scene": [],
   "purpose": "Six LARGE blank light parchment writing regions in a bound communal ledger arrangement on wooden tabletop, 3columns by2rows, simple flat ink-rule division, not separate modern cards. Interior writing areas columns x5–31,x37–63,x69–95, rows y9–43 and y54–88 percent. Quiet light warm cream, restrained dark leather edges and wood, no text, icons, buttons, ornaments or tabs.",
   "dimensions": {
    "width": 1024,
    "height": 768
   },
   "transparent": false,
   "alphaBounds": {
    "x": 0,
    "y": 0,
    "width": 1024,
    "height": 768
   },
   "preferredStaging": {},
   "footline": null,
   "safeArea": {},
   "textSafeArea": [
    {
     "x": 10,
     "y": 15,
     "width": 23,
     "height": 31,
     "fontSize": 18,
     "maxTextLines": 7,
     "units": "percent"
    },
    {
     "x": 40,
     "y": 15,
     "width": 20,
     "height": 31,
     "fontSize": 18,
     "maxTextLines": 7,
     "units": "percent"
    },
    {
     "x": 67,
     "y": 15,
     "width": 23,
     "height": 31,
     "fontSize": 18,
     "maxTextLines": 7,
     "units": "percent"
    },
    {
     "x": 10,
     "y": 54,
     "width": 23,
     "height": 30,
     "fontSize": 18,
     "maxTextLines": 7,
     "units": "percent"
    },
    {
     "x": 40,
     "y": 54,
     "width": 20,
     "height": 30,
     "fontSize": 18,
     "maxTextLines": 7,
     "units": "percent"
    },
    {
     "x": 67,
     "y": 54,
     "width": 23,
     "height": 30,
     "fontSize": 18,
     "maxTextLines": 7,
     "units": "percent"
    }
   ],
   "viewDirection": null,
   "branchUse": [],
   "integrationNotes": "Originale Canon-Bilder separat; keine QA-Komposition als Runtime-Hintergrund. Text als HTML, mindestens18px; keine Bildzitate.",
   "sha256": "3807689a8caa90547cbc8962690ae8580f4a828b57b384c14c2c51bcb450a4de"
  }
 },
 "nonCombinable": [
  [
   "delegation_inside",
   "negotiation_broken"
  ],
  [
   "camp_departure",
   "group_retreat"
  ],
  [
   "after_defeat",
   "after_negotiation_collapse",
   "after_protection",
   "after_fragmentation",
   "after_deescalation"
  ],
  [
   "distant_troops",
   "road_troops_approaching_baked_troops"
  ]
 ]
};

// Approved room-registered arrival group; original delivery registrations remain intact.
chapterFiveStaging.assets.overlay_wounded_return_council = {
 "filename": "ch5_overlay_wounded_return_council.png",
 "path": "assets/chapter5/overlays/ch5_overlay_wounded_return_council.png",
 "type": "overlays",
 "scene": [
  "ch5_theological_council_evening"
 ],
 "purpose": "Ein verletzter Erwachsener wird im Vordergrund von zwei Menschen gestützt.",
 "dimensions": {
  "width": 1024,
  "height": 768
 },
 "transparent": true,
 "alphaBounds": {
  "x": 188,
  "y": 229,
  "width": 300,
  "height": 318
 },
 "preferredStaging": {
  "scale": 1,
  "left": 0,
  "top": 0,
  "units": "percent of entire scene; transform-origin top-left",
  "visibleAlphaBounds": [
   190,
   231,
   486,
   546
  ],
  "required": true
 },
 "sha256": "1dfca360a5288ccbcb50e084c78360c6a4a327aac387df151670a0e09f636ed8"
};
chapterFiveStaging.scenes.theological_council_evening.overlayRegistration.wounded_return_council = chapterFiveStaging.assets.overlay_wounded_return_council.preferredStaging;
