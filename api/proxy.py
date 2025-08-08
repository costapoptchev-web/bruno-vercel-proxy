import json, requests

# Този handler е стандартен за Vercel Python Functions
def handler(request):
    try:
        data = request.get_json() or {}
        # ТВОЯТ Make webhook (EU2):
        MAKE_WEBHOOK = "https://hook.eu2.make.com/ovbx9kinytetkopoj53d7be7n7m8wp3a"

        r = requests.post(
            MAKE_WEBHOOK,
            json=data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )

        return (
            json.dumps({
                "status": "✅ Forwarded to Make",
                "make_status": r.status_code,
                "make_response": r.text
            }),
            200,
            {"Content-Type": "application/json"}
        )

    except Exception as e:
        return (
            json.dumps({"status": "❌ Failed", "error": str(e)}),
            500,
            {"Content-Type": "application/json"}
        )
