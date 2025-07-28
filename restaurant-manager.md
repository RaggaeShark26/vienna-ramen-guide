# 🍜 Vienna Ramen Guide - Restaurant Manager

## 🚀 Quick Add New Restaurant

**Step 1:** Copy this template  
**Step 2:** Fill in your restaurant info  
**Step 3:** Add it to restaurants.json  
**Step 4:** Update your website  

```json
{
  "name": "Restaurant Name Here",
  "tags": ["atmosphere", "style", "specialty"],
  "description": "What makes this place special? Write 1-2 sentences.",
  "address": "Street Number, Postal Code Vienna",
  "phone": "+43 1 XXX XXXX",
  "priceRange": "€€",
  "openingHours": "Mo-Sa 11:30-22:00, So closed",
  "website": "https://restaurant-website.com",
  "instagram": "instagram_handle"
}
```

## 📝 Field Guide

| Field | Description | Examples |
|-------|-------------|----------|
| **name** | Restaurant name | "Ramen Tokyo", "Noodle Bar Vienna" |
| **tags** | 2-4 descriptive words | ["cozy", "authentic"], ["modern", "trendy"] |
| **description** | 1-2 sentences | What's special about this place? |
| **address** | Full Vienna address | "Mariahilfer Straße 123, 1060 Wien" |
| **phone** | Austrian phone format | "+43 1 234 5678" |
| **priceRange** | Price level | "€" (cheap), "€€" (medium), "€€€" (expensive) |
| **openingHours** | When they're open | "Daily 12:00-22:00" or "Mo-Sa 11:30-22:00, So closed" |
| **website** | Full URL | "https://restaurant.com" |
| **instagram** | Handle only | "ramen_vienna" (no @ symbol) |

## ✏️ How to Edit Existing Restaurants

1. Find the restaurant in `restaurants.json`
2. Change the field you want to update
3. Save the file
4. Your website updates automatically!

## 🔧 Common Examples

**Adding operating hours:**
```
"openingHours": "Mo-Fr 11:30-22:00, Sa-So 12:00-23:00"
```

**Multiple tags:**
```
"tags": ["authentic", "cozy", "traditional", "popular"]
```

**No website:**
```
"website": ""
```

## 📱 Quick Access Links

- **Edit Restaurants:** [restaurants.json](https://github.com/RaggaeShark26/vienna-ramen-guide/edit/main/restaurants.json)
- **View All Files:** [Repository Home](https://github.com/RaggaeShark26/vienna-ramen-guide)

---
*Last updated: 2025-07-28 by RaggaeShark26*
