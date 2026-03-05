# Risk Contribution Block - Setup Guide

## Problem Identified

The `risk_contribution` block was showing "No data available for this portfolio" because:

1. **Missing Block Registration**: The component wasn't registered in `RenderBlocks.tsx`
2. **Missing Environment Variable**: The API endpoint wasn't configured in `.env`

## Fixes Applied

### 1. Registered the Component (✅ DONE)
- Added import in `src/blocks/RenderBlocks.tsx`
- Added to `blockComponents` mapping

### 2. Enhanced Error Handling (✅ DONE)
- Added detailed console logging to debug API responses
- Improved error messages to show specific issues
- Added loading and error states to the UI

### 3. Added Environment Variable (⚠️ NEEDS YOUR INPUT)
- Added `NEXT_PUBLIC_PORTFOLIO_RISK_CONTRIBUTION_API` to `.env`
- **YOU NEED TO UPDATE THIS WITH YOUR ACTUAL API ENDPOINT**

## Next Steps - ACTION REQUIRED

### Step 1: Configure the API Endpoint

Open `.env` file and replace `YOUR_API_ENDPOINT_HERE` with your actual API endpoint:

```bash
NEXT_PUBLIC_PORTFOLIO_RISK_CONTRIBUTION_API=https://your-api-domain.com/api/risk-contribution
```

### Step 2: Restart the Development Server

After updating the `.env` file, you MUST restart your Next.js development server:

```bash
# Stop the current server (Ctrl+C)
# Then restart it
npm run dev
```

**Important**: Environment variables are only loaded when the server starts, so restarting is required!

### Step 3: Test the Component

1. Open your browser to the page with the `risk_contribution` block
2. Open the browser console (F12 → Console tab)
3. Look for the detailed logs:

```
=== FETCHING RISK CONTRIBUTION ===
Portfolio Name: [portfolio name]
Portfolio Value: [value]
API Endpoint: [your API endpoint]

=== API RESPONSE ===
Full Response: {...}
```

### Step 4: Verify the API Response

The API should return data in this format:

```json
{
  "result": {
    "risk_contribution": {
      "AAPL": {
        "Name": "Apple Inc.",
        "Market Value": 50000,
        "individual stock_volatility": 25.5,
        "risk_contributions": 1.5,
        "market_contribution": 1.2,
        "isolated_risk": 0.8,
        "idiosyncratic_portion": 0.3
      },
      "GOOGL": {
        ...
      }
    },
    "portfolio_market_value": 1000000,
    "portfolio_risk": 15.5,
    "historical_market_risk": 18.2
  }
}
```

## Debugging

If you still see errors, check the browser console for detailed logs:

### Error: "API Error: Unable to fetch data"
- The API endpoint is not configured or incorrect
- Check `.env` file has the correct `NEXT_PUBLIC_PORTFOLIO_RISK_CONTRIBUTION_API`
- Verify the API is accessible

### Error: "Invalid API response: Missing result data"
- The API is returning data in an unexpected format
- Check the console log "Full Response:" to see what the API is actually returning

### Error: "Invalid API response: Missing risk_contribution data"
- The API response has a `result` object but no `risk_contribution` property
- Verify your API is returning the correct data structure

## Console Logs Explained

The component now logs detailed information to help you debug:

1. **FETCHING RISK CONTRIBUTION**: Shows what parameters are being sent
2. **API RESPONSE**: Shows the raw response from the API
3. **PROCESSING DATA**: Shows how many stocks are being processed
4. **PROCESSED ROWS**: Shows the final data structure
5. **SUCCESS**: Confirms data loaded successfully
6. **ERROR**: Shows any errors that occurred

## Common Issues

### Issue: "No data available for this portfolio"
**Solution**: Configure the API endpoint in `.env` and restart the server

### Issue: Data shows but graph/table is empty
**Solution**: Check the console logs to see if the data structure matches what's expected

### Issue: Changes to .env not taking effect
**Solution**: Restart the development server (environment variables are only loaded at startup)

## Need Help?

If you're still having issues:

1. Check the browser console for detailed error logs
2. Verify your API endpoint is working (test it with Postman or curl)
3. Make sure the API returns data in the expected format shown above
4. Ensure you've restarted the dev server after changing `.env`
